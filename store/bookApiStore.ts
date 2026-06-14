import { create } from "zustand";
import type { Book } from "@/types/bookApis";

type BookApiProps = {
    showAudioPlayer: boolean;
    book: Book | null;
    isLoading: boolean;
    error: string| null;
    setShowAudioPlayer: (isShowed: boolean) => void
    fetchBookApi: (apiLink: string) => Promise<void>;
}

export const useBookApiStore = create<BookApiProps>((set) => ({
    showAudioPlayer: false,
    book: null,
    isLoading: false,
    error: null, 

    setShowAudioPlayer: (isShowed) => set(() => ({showAudioPlayer: isShowed})),

    fetchBookApi: async (apiLink: string) => {
        try {
            set(() => ({isLoading: true, error: null}))

            const res = await fetch(apiLink);

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const bookData = await res.json()

            set(() => ({
                book: bookData,
                isLoading: false,
            }))
        } catch (error) {
            set(() => ({
                error: error instanceof Error ? error.message : "Unknown error",
                isLoading: false,
            }))
        }
    }
}))
