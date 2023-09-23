import { useState, useEffect } from "react";
import { Product } from "../../models/Product";
import { getProductsWithPrices } from "../../services/product";
import ProductItem from "../reusable/ProductItem";
import { searchIntoProducts } from "../../services/search";

export default function ProductSection({
    search,
    company,
}: {
    search?: string;
    company?: string;
}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (search
            ? company
                ? searchIntoProducts(company, "seller")
                : searchIntoProducts(search, "default")
            : getProductsWithPrices()
        )
            .then((products) => setProducts(products as any))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    }, [search]);

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
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
                {products.length === 0 && (
                    <div className="mt-4"> Product List is empty </div>
                )}
            </div>
        </div>
    );
}
