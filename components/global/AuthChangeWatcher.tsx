"use client";
import { useEffect } from "react";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavStore } from "@/store/NavStore";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { useRouter } from "next/navigation";
import { getPremiumStatus } from "@/lib/getPremiumStatus";

function AuthChangeWatcher() {
    const router = useRouter();
    const onRoute = useNavStore(state => state.onRoute);
    const setUser = useAuthModalStore(state => state.setUser);
    const setAuthLoading = useAuthModalStore(state => state.setAuthLoading);
    const setNeedAccountUpgrade = useSubscriptionStore(state => state.setNeedAccountUpgrade);
    const setIsSubscribed = useSubscriptionStore(state => state.setIsSubscribed);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setAuthLoading(false);

            // If user is choosing plan but on guest account, they must upgrade to a permanent account.
            if (user?.isAnonymous && onRoute === "/choose-plan") {
                setNeedAccountUpgrade(true)
                return
            }
            // If user is logged in and on homepage, redirect them to for-you page
            if (user && onRoute === "/") {
                router.push("/for-you")
                return
            }
            // If user is logged in and is not on guest account, check if they subscribe.
            if (user && !user?.isAnonymous) {
                const newSubscriptionStatus = await getPremiumStatus()
                setIsSubscribed(newSubscriptionStatus)
                setNeedAccountUpgrade(false);
                return
            }
            setIsSubscribed(false);
            setNeedAccountUpgrade(false)
        })

        return () => unsubscribe() 
    }, [router, onRoute, setIsSubscribed, getPremiumStatus,setUser, setAuthLoading, setNeedAccountUpgrade])

    return null
}

export default AuthChangeWatcher