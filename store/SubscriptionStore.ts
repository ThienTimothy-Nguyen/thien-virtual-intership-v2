import { create } from "zustand";

type SubscriptionStoreProps = {
    needAccountUpgrade: boolean;
    isSubscribed: boolean;
    setIsSubscribed: (isSubscribed: boolean) => void;
    setNeedAccountUpgrade: (needUpgrade: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionStoreProps>((set) => ({
    needAccountUpgrade: false,
    isSubscribed: false,
    setNeedAccountUpgrade: (needUpgrade) => set(() => ({needAccountUpgrade: needUpgrade})),
    setIsSubscribed: async (isSubscribed) => set(() => ({isSubscribed: isSubscribed}))
}))