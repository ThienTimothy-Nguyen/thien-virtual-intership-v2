import { auth, db } from "./firebase";
import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

export const getPremiumStatus = async (): Promise<boolean> => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not logged in");

    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
    const q = query(
        subscriptionsRef,
        where("status", "in", ["trialing", "active"])
    );

    return new Promise<boolean>((resolve, reject) => {
        const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
            if (snapshot.docs.length === 0) {
            resolve(false);
            } else {
            resolve(true);
            }
            unsubscribe();
        },
        reject
        );
    });
};