"use client";
import { FaRegUser } from "react-icons/fa6";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AuthSignUpModal from "./AuthSignUpModal";

import type { LoginMethod } from "@/types/auth";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import AuthUpgradeModal from "./AuthUpgradeModal";
import { useNavStore } from "@/store/NavStore";


function AuthModal() {
    const [needSignUp, setNeedSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const needAccountUpgrade = useSubscriptionStore(state => state.needAccountUpgrade);
    const currentUser = useAuthModalStore(state => state.currentUser);
    const onRoute = useNavStore(state => state.onRoute);
    const isOpen = useAuthModalStore(state => state.isOpen);
    const closeAuthModal = useAuthModalStore(state => state.closeAuthModal);
    const setNeedAccountUpgrade = useSubscriptionStore(state => state.setNeedAccountUpgrade)

    async function handleSubmit(loginMethod: LoginMethod): Promise<void | null> {
        if (loginMethod === "emailPassword") {
            try { 
                await signInWithEmailAndPassword(auth, email, password);
                closeAuthModal() 
            }
            catch {
                alert("Unable to find user. Please try again or sign up")
                return null
            }
        } else if (loginMethod === "guest") {
            await signInAnonymously(auth)
            closeAuthModal()
        } else if (loginMethod === "google") {
            await signInWithPopup(auth, googleProvider)
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
            
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                setNeedSignUp(false)
                closeAuthModal()
            }
            catch {
                alert("Email already in use. Please input another email")
            }
        }
        else return null
    }

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-transparent z-100">

            <div className="w-full h-full bg-black/80"></div>

            {needSignUp ? 
            
            <AuthSignUpModal 
                setEmail={setEmail}
                setPassword={setPassword}
                setNeedSignUp={setNeedSignUp}
                setConfirmPassword={setConfirmPassword}
                handleSubmit={handleSubmit}
            /> :
            
                needAccountUpgrade ? 
                    
                <AuthUpgradeModal 
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    setNeedSignUp={setNeedSignUp}
                    /> :

                <form 
                    onSubmit={(e) => 
                        {
                            e.preventDefault();
                            handleSubmit("emailPassword");
                        }}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl 
                                flex flex-col gap-4 justify-center items-center w-100 h-130">
                    {onRoute !== "/choose-plan" && <button 
                        type="button"
                        onClick={() => {
                            closeAuthModal()
                            setNeedSignUp(false)
                        }} 
                        className="absolute top-3 right-3">
                        <RxCross2 className="size-8" />
                    </button>}
                    <h1 className="font-bold text-xl">Log in to Summarist</h1>
                    {!currentUser?.isAnonymous && <button 
                        type="button"
                        className="bg-[#405698] rounded-sm text-white h-9 w-75 relative"
                        onClick={() => {
                            handleSubmit("guest")
                        }}
                    >
                        <FaRegUser className="absolute size-5 left-2 top-2" />
                        Login as a Guest
                    </button>}
                    {!currentUser?.isAnonymous && <div className="flex items-center justify-center gap-4">
                        <div className="bg-gray-300 h-px w-28"></div>
                        <h1>or</h1>
                        <div className="bg-gray-300 h-px w-28"></div>
                    </div>}
                    <button 
                        type="button"
                        className="bg-[#5383EC] rounded-sm text-white h-9 w-75 relative"
                        onClick={() => {
                            handleSubmit("google")
                        }}
                    >
                        <img src="/assets/google.png" alt="google" className="absolute size-7 p-1 bg-white rounded-sm left-1 top-1" />
                        Login with Google
                    </button>
                    <div className="flex items-center justify-center gap-4">
                        <div className="bg-gray-300 h-px w-28"></div>
                        <h1>or</h1>
                        <div className="bg-gray-300 h-px w-28"></div>
                    </div>
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
                    <button className="btn home__cta--btn">Login</button>
                    <button 
                        type="button" 
                        className="text-blue-500 cursor-not-allowed">
                            Forgot your password?
                    </button>
                    <button 
                        type="button" 
                        className="text-blue-500 font-bold bg-gray-100 rounded-sm h-9 w-80"
                        onClick={() => {
                            onRoute !== "/choose-plan" ? 
                            setNeedSignUp(true) :
                            setNeedAccountUpgrade(true)
                        }}
                    >
                        Don't have an account?
                    </button>
                </form>}
        </div>
    )
}

export default AuthModal