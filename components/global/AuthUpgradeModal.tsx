import { useAuthModalStore } from "@/store/AuthModalStore";
import { useNavStore } from "@/store/NavStore";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";
import { EmailAuthProvider, linkWithCredential, linkWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

type AuthUpgradeModalProps = {
    email: string;
    password: string;
    confirmPassword: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setConfirmPassword: Dispatch<SetStateAction<string>>
    setNeedSignUp: Dispatch<SetStateAction<boolean>>;
}

function AuthUpgradeModal({
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    setNeedSignUp,
}: AuthUpgradeModalProps) {

    const closeAuthModal = useAuthModalStore(state => state.closeAuthModal);
    const setNeedAccountUpgrade = useSubscriptionStore(state => state.setNeedAccountUpgrade)
    const onRoute = useNavStore(state => state.onRoute)

    async function handleUpgrade(upgradeMethod: "emailPassword" | "google"): Promise<void> {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("No user is signed in.");
        };

        if (!user.isAnonymous) {
            throw new Error("User is not a guest account.");
        };

        try {
            if (upgradeMethod === "emailPassword") {

                if (password !== confirmPassword) {
                    alert("Passwords do not match.");
                    return 
                }

                const credential = EmailAuthProvider.credential(email, password);

            
                    await linkWithCredential(user, credential);
            
            }
            else if (upgradeMethod === "google") {
                await linkWithPopup(user, googleProvider);
            }
        } catch (error: any) {
            if (
                error.code === "auth/email-already-in-use" ||
                error.code === "auth/credential-already-in-use"
            ) {
                alert("This account already exists. Please log in instead.");
                return;
            }

            alert(error.message);
            return;
        }

        setNeedAccountUpgrade(false);
        closeAuthModal();
    }

    return (
            <form 
                onSubmit={(e) => 
                    {
                        e.preventDefault();
                        handleUpgrade("emailPassword");
                    }}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl rounded-2xl 
                            flex flex-col gap-6 justify-center items-center w-100 h-130">
                {onRoute !== "/choose-plan" && <button 
                    type="button"
                    onClick={() => {
                        closeAuthModal()
                        setNeedSignUp(false)
                        setNeedAccountUpgrade(false)
                    }} 
                    className="absolute top-3 right-3">
                    <RxCross2 className="size-8" />
                </button>}
                <h1 className="font-bold text-xl text-center">Please create a permanent account to continue</h1>
                <button 
                    type="button"
                    className="bg-[#5383EC] rounded-sm text-white h-9 w-75 relative"
                    onClick={() => {
                        handleUpgrade("google")
                    }}
                >
                    <img loading="lazy" src="/assets/google.png" alt="google" className="absolute size-7 p-1 bg-white rounded-sm left-1 top-1" />
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
                <input 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-sm h-9 w-75 px-4" 
                    placeholder="Confirm password" 
                    type="password"
                    autoComplete='new-password'
                />
                <button className="btn home__cta--btn">Create account</button>
                <button 
                    type="button" 
                    className="text-blue-500 font-bold bg-gray-100 rounded-sm h-9 w-80"
                    onClick={() => setNeedAccountUpgrade(false)}
                >
                    Already have an account ?
                </button>
            </form>
    )
}

export default AuthUpgradeModal