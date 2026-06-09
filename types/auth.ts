import { Dispatch, SetStateAction } from "react";

export type LoginMethod = "" | "google" | "emailPassword" | "guest" | "signUp";

export type AuthSignUpProps = { 
    setEmail: Dispatch<SetStateAction<string>>; 
    setPassword: Dispatch<SetStateAction<string>>; 
    setNeedSignUp: Dispatch<SetStateAction<boolean>>;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    handleSubmit: (loginMethod: LoginMethod) => Promise<null | void>;
}

