import { create } from "zustand";

type SubscriptionStoreProps = {
    isSubscribed: boolean;
}

export const useSubscriptionStore = create<SubscriptionStoreProps>((set) => ({
    isSubscribed: false
}))