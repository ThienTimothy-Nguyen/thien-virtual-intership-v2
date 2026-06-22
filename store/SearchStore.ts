import { create } from "zustand";
import { Books } from "@/types/bookApis";

let timer: ReturnType<typeof setTimeout> | null = null;

type SearchStoreProps = {
    searchError: string | null;
    isSearchLoading:  boolean;
    bookList: Books | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    fetchBooks: (searchQuery: string) => Promise<void>;
    debouncedSearch: (query: string) => void;
}
 
export const useSearchStore = create<SearchStoreProps>((set, get) => ({
    searchError: null,
    isSearchLoading: false,
    bookList: null,
    searchQuery: "",

    setSearchQuery: (query) => {
        set(() => ({ searchQuery: query.trim() }));
        get().debouncedSearch(query.trim());
    },

    fetchBooks: async (searchQuery) => {

        set(() => ({
            searchError: null,
            isSearchLoading: true,
        }))

        try {
            const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(searchQuery)}`)
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const data = await res.json()

            set(() => ({
                bookList: data,
                isSearchLoading: false,
            }))
        } catch (error) {
            set(() => ({
                searchError: error instanceof Error ? error.message : "Unknown error",
                isSearchLoading: false,
            }))
        }
    },

    debouncedSearch: (query) => {
        if (timer) clearTimeout(timer)

        //If there is no input, then no debounce, remove bookList immediately
        if (!query) {
            set({
                bookList: null,
                searchError: null,
                isSearchLoading: false,
            });
            return;
        }

        timer = setTimeout(() => {
            get().fetchBooks(query)
        }, 500);
    }
}))