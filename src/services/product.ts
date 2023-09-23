import {
    collection,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { firestore } from "./imports";
import { Product } from "../models/Product";

export async function getProductsWithPrices() {
    const productRef = collection(firestore, "products");
    const { docs } = await getDocs(productRef);
    const products = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        ref: doc.ref,
    }));

    const productsWithPrice = products.map(async (product) => {
        const { docs } = await getDocs(
            collection(firestore, product.ref.path, "prices")
        );
        const price = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))[0];
        return { ...product, price };
    });
    return Promise.all(productsWithPrice).then((products) =>
        products.map(({ id, ref, ...data }) => ({ id, ...data }))
    );
}

export async function getProductWithPrice(id: string) {
    const productRef = doc(firestore, "products", id);
    const product = (await getDoc(productRef).then((value) => ({
        id: value.id,
        ...value.data(),
    }))) as Product;

    const priceRef = collection(firestore, "products", id, "prices");
    const price = (await getDocs(priceRef)).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))[0];

    product.price = price as any;

    return product;
}
