"use client"
import { RxCross2 } from 'react-icons/rx';
import { useAuthModalStore } from '@/store/AuthModalStore';
import type { AuthSignUpProps } from '@/types/auth';

function AuthSignUpModal({ 
        setEmail, 
        setPassword,  
        setNeedSignUp,
        handleSubmit,
        setConfirmPassword
    }: AuthSignUpProps) {

    const closeAuthModal = useAuthModalStore(state => state.closeAuthModal)

    return (
        <form 
            onSubmit={(e) => 
                {
                    e.preventDefault()
                    handleSubmit("signUp")
                }}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl 
                        flex flex-col gap-8 justify-center items-center w-100 h-130">
            <button 
                type='button'
                onClick={() => {
                    closeAuthModal()
                    setNeedSignUp(false)
                }} 
                className="absolute top-3 right-3">
                <RxCross2 className="size-8" />
            </button>
            <h1 className="font-bold text-xl">Create your account with Summarist</h1>
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
                autoComplete="new-password" />
            <input 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-sm h-9 w-75 px-4" 
                placeholder="Confirm password" 
                type="password"
                autoComplete='new-password'
            />
            <button 
                onClick={() => handleSubmit("signUp")}
                className="btn home__cta--btn"
            >
                Sign Up
            </button>
            <button 
                type="button" 
                className="text-blue-500 font-bold bg-gray-100 rounded-sm h-9 w-80"
                onClick={() => setNeedSignUp(false)}
            >
                Back to login
            </button>
        </form>
    )
}

export default AuthSignUpModal