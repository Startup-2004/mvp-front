import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "./imports";

export async function getCompanies() {
    const ref = collection(firestore, "companies");
    const companiesResponse = await getDocs(ref);

    return companiesResponse.docs.map((company) => ({
        id: company.id,
        ...company.data(),
    }));
}

export async function getCompanyById(id: string) {
    const ref = doc(firestore, "companies", id);
    const company = await getDoc(ref);

    return { id: company.id, ...company.data() };
}
