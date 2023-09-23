import { useNavigate, useParams } from "react-router-dom";
import { getProductWithPrice } from "../services/product";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { search } from "../services/search";
import { auth } from "../services/imports";
import { initializePayment } from "../services/payment";

export default function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        getProductWithPrice(id!)
            .then((products) => setProduct(products as any))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    }, [search]);

    const handleClick = () => {
        const user = auth.currentUser;

        if (!user) return navigate("/auth/login");

        const price = product!.price?.id as string;

        initializePayment(user.uid, price)
            .then((url) => window.location.assign(url as string))
            .catch(alert);
    };

    if (!loaded)
        return (
            <div className="w-full h-[480px] flex flex-col justify-center items-center">
                Loading
            </div>
        );

    if (error) {
        console.error(error);
        return (
            <div className="w-full h-[480px] flex flex-col justify-center items-center">
                Error from our end has happened
            </div>
        );
    }

    if (!product) throw new Error();

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="max-w-xs mx-auto">
                    <img
                        src={product.images[0]} // Assuming the first image in the array is the main product image
                        alt={product.name}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                    <div className="mt-4">
                        <span className="text-gray-700">
                            Seller: {product.metadata.seller}
                        </span>
                    </div>
                    {product.price && (
                        <div className="mt-4">
                            <span className="text-2xl font-semibold">
                                Price: {product.price.unit_amount / 100}{" "}
                                {product.price.currency}
                            </span>
                        </div>
                    )}
                </div>
                <button
                    className="text-white bg-[#6772E5] p-2 rounded w-full mt-4"
                    onClick={handleClick}
                >
                    Pay
                </button>
            </div>
        </div>
    );
}
