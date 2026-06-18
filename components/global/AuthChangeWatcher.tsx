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

            if (user?.isAnonymous && onRoute === "/choose-plan") {
                setNeedAccountUpgrade(true)
                return
            }
            if (user && onRoute === "/") {
                router.push("/for-you")
                return
            }
            if (user && !user?.isAnonymous) {
                const newSubscriptionStatus = await getPremiumStatus()
                setIsSubscribed(newSubscriptionStatus)
                console.log(newSubscriptionStatus)
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