import { useNavigate } from "react-router-dom";
import { Product } from "../../models/Product";

export default function ProductItem({ product }: { product: Product }) {
    const navigate = useNavigate();
    // const handleClick = () => {
    //     const user = auth.currentUser;

    //     if (!user) return navigate("/auth/login");

    //     const price = product.price?.id as string;

    //     initializePayment(user.uid, price).then((url) =>
    //         window.location.assign(url as string)
    //     ).catch(alert);
    // };

    const handleClick = () => navigate("/product/" + product.id);

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col p-4">
            <div className="flex">
                <div className="pb-2/3">
                    <img
                        src={product.images[0]} // Assuming the first image in the array is the main product image
                        alt={product.name}
                        className=" h-full w-full object-contain my-auto"
                    />
                </div>
                <div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            {product.name}
                        </div>
                        <p className="text-gray-700 text-base">
                            {product.description}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="text-gray-700 text-base">
                            Seller: {product.metadata.seller}
                        </span>
                    </div>
                    {product.price && (
                        <div className="px-6 pt-4 pb-2">
                            <span className="text-xl font-semibold text-gray-900">
                                Price: {product.price.unit_amount / 100}{" "}
                                {product.price.currency.toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-auto"></div>
            <button
                className="text-white bg-[#6772E5] p-2 rounded"
                onClick={handleClick}
            >
                Navigate
            </button>
        </div>
    );
}
