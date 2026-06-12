import { create } from "zustand";
import type { User } from "firebase/auth";

type AuthModalStore = {
    currentUser: User | null;
    isAuthLoading: boolean;
    isOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    setAuthLoading: (loading: boolean) => void;
    setUser: (user: User | null) => void
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    currentUser: null,
    isAuthLoading: true,
    isOpen: false,
    openAuthModal: () => set(() => ({isOpen: true})),
    closeAuthModal: () => set(() => ({isOpen: false})),
    setAuthLoading: (loading) => set(() => ({isAuthLoading: loading})),
    setUser: (user) => set(() => ({currentUser: user})),
}))