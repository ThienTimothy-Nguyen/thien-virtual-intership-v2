import { Dispatch, SetStateAction } from "react";

export type loginMethod = "" | "google" | "emailPassword" | "guest" | "signUp";

export type AuthSignUpProps = { 
    setEmail: Dispatch<SetStateAction<string>>; 
    setPassword: Dispatch<SetStateAction<string>>; 
    setLoginMethod: Dispatch<SetStateAction<loginMethod>>;
    setNeedSignUp: Dispatch<SetStateAction<boolean>>;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    handleSubmit: () => Promise<null | void>;
}

