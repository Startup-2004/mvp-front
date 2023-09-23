import { useParams } from "react-router-dom";
import ProductSection from "../components/sections/ProductSection";

export default function SearchPage() {
    const { q } = useParams();
    return <ProductSection search={q} />;
}
