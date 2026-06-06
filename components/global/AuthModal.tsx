"use client";
import { FaRegUser } from "react-icons/fa6";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AuthSignUpModal from "./AuthSignUpModal";

import type { loginMethod } from "@/types/auth";

function AuthModal() {
    const [loginMethod,  setLoginMethod] = useState<loginMethod>("")
    const [needSignUp, setNeedSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const isOpen = useAuthModalStore(state => state.isOpen) 
    const closeAuthModal = useAuthModalStore(state => state.closeAuthModal)

    async function handleSubmit(): Promise<void | null> {
        if (loginMethod === "emailPassword") {
            try { await signInWithEmailAndPassword(auth, email, password) }
            catch {
                alert("Unable to find user. Please try again or sign up")
                return null
            }
            closeAuthModal()
        } else if (loginMethod === "guest") {
            await signInAnonymously(auth)
            closeAuthModal()
        } else if (loginMethod === "google") {
            await signInWithPopup(auth, provider)
            closeAuthModal()
        } else if(loginMethod === "signUp") {
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return null;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return null;
            }
            
            try {await createUserWithEmailAndPassword(auth, email, password)}
            catch {
                alert("Email already in use. Please input another email")
            }
        }
        else return null
    }

    useEffect(() => {
        if(isOpen) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""

        return () => {document.body.style.overflow = ""}
    }, [isOpen])

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-transparent z-50">
            <div className="w-full h-full bg-black/80"></div>
            {needSignUp ? 
            
            <AuthSignUpModal 
                setEmail={setEmail}
                setPassword={setPassword}
                setLoginMethod={setLoginMethod}
                setNeedSignUp={setNeedSignUp}
                setConfirmPassword={setConfirmPassword}
                handleSubmit={handleSubmit}
            /> :

            <form 
                onSubmit={(e) => 
                    {
                        e.preventDefault()
                        handleSubmit()
                    }}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl 
                            flex flex-col gap-4 justify-center items-center w-100 h-130">
                <button 
                    onClick={() => {
                        closeAuthModal()
                        setNeedSignUp(false)
                    }} 
                    className="absolute top-3 right-3">
                    <RxCross2 className="size-8" />
                </button>
                <h1 className="font-bold text-xl">Log in to Summarist</h1>
                <button 
                    className="bg-[#405698] rounded-sm text-white h-9 w-75 relative"
                    onClick={() => setLoginMethod("guest")}
                >
                    <FaRegUser className="absolute size-5 left-2 top-2" />
                    Login as a Guest
                </button>
                <div>or</div>
                <button 
                    className="bg-[#5383EC] rounded-sm text-white h-9 w-75 relative"
                    onClick={() => setLoginMethod("google")}
                >
                    <img src="/assets/google.png" alt="google" className="absolute size-7 p-1 bg-white rounded-sm left-1 top-1" />
                    Login with Google
                </button>
                <div>or</div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-sm h-9 w-75 px-4" 
                    placeholder="Email address" 
                    type="email"
                    autoComplete="email" />
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-sm h-9 w-75 px-4" 
                    placeholder="Password" 
                    type="password"
                    autoComplete="current-password" />
                <button 
                    className="btn home__cta--btn"
                    onClick={() => setLoginMethod("emailPassword")}
                >Log In</button>
                <button type="button" className="text-blue-500 cursor-not-allowed">Forgot your password?</button>
                <button 
                    type="button" 
                    className="text-blue-500 font-bold bg-gray-100 rounded-sm h-9 w-80"
                    onClick={() => setNeedSignUp(true)}
                >
                    Don't have an account?
                </button>
            </form>
            }
        </div>
    )
}

export default AuthModal