"use client";
import { useEffect } from "react";
import { useNavStore } from "@/store/NavStore";
import { useAuthModalStore } from "@/store/AuthModalStore";

function ScrollLockWatcher() {
  const isOpen = useAuthModalStore(state => state.isOpen)
    const isNavOpen = useNavStore(state => state.isNavOpen)

    useEffect(() => {
        if(isOpen || isNavOpen) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""

        return () => {document.body.style.overflow = ""}
    }, [isOpen, isNavOpen])
    
    return null
}

export default ScrollLockWatcher