"use client";
import { useEffect, useState } from "react";
import { useNavStore } from "@/store/NavStore";
import { usePathname } from "next/navigation";
import { useAuthModalStore } from "@/store/AuthModalStore";

function RouteChangeWatcher() {
    const closeNav = useNavStore(state => state.closeNav);
    const closeAuthModal = useAuthModalStore(state => state.closeAuthModal)
    const setOnRoute = useNavStore(state => state.setOnRoute);
    const pathName = usePathname();

    useEffect(() => {
        closeNav()
        closeAuthModal()
        setOnRoute(pathName)
    }, [pathName, closeNav, setOnRoute])

    return null
}

export default RouteChangeWatcher