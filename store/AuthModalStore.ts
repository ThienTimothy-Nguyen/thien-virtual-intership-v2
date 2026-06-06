import { create } from "zustand";

type AuthModalStore = {
    isOpen: boolean,
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    openAuthModal: () => set(() => ({isOpen: true})),
    closeAuthModal: () => set(() => ({isOpen: false})),
}))