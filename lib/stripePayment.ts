"use client";
import { FirebaseApp } from "firebase/app";
import { auth, db } from "./firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getCheckoutUrl = async ( 
    priceId: string,
): Promise<string> => {
    const userId = auth.currentUser?.uid;
    const origin = window.location.origin;

    if (!userId) throw new Error("User is not authenticated");

    const checkoutSessionRef = collection(
        db,
        "customers",
        userId,
        "checkout_sessions"
    );

    const checkoutSessionData: Record<string, unknown> = {
        price: priceId,
        success_url: `${origin}/for-you`,
        cancel_url: `${origin}/choose-plan`,
    };

    console.log("checkoutSessionData:", checkoutSessionData);

    const docRef = await addDoc(checkoutSessionRef, checkoutSessionData);

    return new Promise<string>((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() as {
                error?: { message: string };
                url?: string;
            };
            if (error) {
                unsubscribe();
                reject(new Error(`An error occurred: ${error.message}`));
            }
            if (url) {
                unsubscribe();
                resolve(url);
            }
        });
    });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
    const user = auth.currentUser;

    let dataWithUrl: any;
    try {
        const functions = getFunctions(app, "us-west2");

        const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-createPortalLink"
        );

        const { data } = await functionRef({
            customerId: user?.uid,
            returnUrl: window.location.origin,
        });

        dataWithUrl = data as { url: string };
    } catch (error) {
        console.error(error);
    }

    return new Promise<string>((resolve, reject) => {
        if (dataWithUrl?.url) {
            resolve(dataWithUrl.url);
        } else {
            reject(new Error("No url returned"));
        }
    });
};
