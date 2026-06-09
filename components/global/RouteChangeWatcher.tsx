"use client";
import { useEffect } from "react";
import { useNavStore } from "@/store/NavStore";
import { usePathname } from "next/navigation";

function RouteChangeWatcher() {
    const closeNav = useNavStore(state => state.closeNav);
    const setOnRoute = useNavStore(state => state.setOnRoute);
    const pathName = usePathname();

    useEffect(() => {
        closeNav()
        setOnRoute(pathName)
    }, [pathName, closeNav, setOnRoute])

    return null
}

export default RouteChangeWatcher