import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../models/Company";
import { getCompanyById } from "../services/company";
import ProductSection from "../components/sections/ProductSection";

export default function CompanyView() {
    const { id } = useParams();
    const [company, setCompany] = useState<Company | undefined>(undefined);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getCompanyById(id!)
            .then((company) => setCompany(company as any))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    }, []);

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

    if (!company) throw new Error();

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="max-w-xs mx-auto">
                    <img
                        src={company.image} // Assuming the image is a URL
                        alt={company.name}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">{company.name}</h2>
                    <div className="text-gray-700 mt-2">
                        <p>ID: {company.id}</p>
                        <p>Phone: {company.phone}</p>
                        <p>Location: {company.location}</p>
                    </div>
                </div>
            </div>
            <ProductSection search="w" company={company.name} />
        </div>
    );
}
