"use client";
import { useEffect } from "react";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

function AuthChangeWatcher() {
    const setUser = useAuthModalStore(state => state.setUser);
    const setAuthLoading = useAuthModalStore(state => state.setAuthLoading)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthLoading(false)
        })

        return () => unsubscribe() 
    }, [setUser, setAuthLoading])

    return null
}

export default AuthChangeWatcher