import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { firestore } from "./imports";

export async function initializePayment(uid: string, price: string) {
    const ref = collection(firestore, "customers", uid, "checkout_sessions");

    const docRef = await addDoc(ref, {
        mode: "payment",
        price,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    return new Promise((resolve, reject) =>
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.data();
            if (!data) return alert("nothing");
            const { error, url } = data;
            if (error) {
                reject(error.message);
            }
            if (url) {
                resolve(url);
            }
        })
    );
}
