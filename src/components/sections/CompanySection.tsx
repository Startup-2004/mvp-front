import { useEffect, useState } from "react";
import { Company } from "../../models/Company";
import { getCompanies } from "../../services/company";
import { useNavigate } from "react-router-dom";

export default function CompanySection() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getCompanies()
            .then((products) => setCompanies(products as any))
            .catch((error) => setError(error.message))
            .finally(() => setLoaded(true));
    }, []);

    const navigate = useNavigate();

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
            <h1 className="text-5xl">Company</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
                    >
                        <img
                            src={company.image} // Assuming the image is a URL
                            alt={company.name}
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="mt-2">
                            <h2 className="text-xl font-semibold">
                                {company.name}
                            </h2>
                            <div className="text-gray-700">
                                <p>Phone: {company.phone}</p>
                                <p>Location: {company.location}</p>
                            </div>
                        </div>
                        <div className="flex-auto"></div>
                        <button
                            className="text-white bg-[#6772E5] p-2 rounded w-full mt-4"
                            onClick={() => navigate("/company/" + company.id)}
                        >
                            Navigate
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
