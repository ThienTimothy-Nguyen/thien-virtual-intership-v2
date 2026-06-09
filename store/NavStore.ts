import { create } from "zustand";

type NavStore = {
    onRoute: string;
    isNavOpen: boolean;
    openNav: () => void;
    closeNav: () => void;
    setOnRoute: (route: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
    onRoute: "/",
    isNavOpen: true,
    openNav: () => set(() => ({isNavOpen: true})),
    closeNav: () => set(() => ({isNavOpen: false})),
    setOnRoute: (route) => set(() => ({onRoute: route}))
}))
