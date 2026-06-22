"use client";

import { useSearchStore } from "@/store/SearchStore";
import SearchBookCard from "./SearchBookCard";
import { useRouter } from "next/navigation";


function SearchPanel() {
    const bookList = useSearchStore(state => state.bookList);
    const router = useRouter();

    if (bookList === null) return;

    return (
        <div 
            className="absolute top-6 right-0 w-full md:right-5 md:left-auto md:w-120 shadow-2xl rounded-sm 
                        bg-white border-[1.75px] border-gray-200 p-4 max-h-[75vh] transition-all duration-300 ease-in-out
                        flex flex-col items-center overflow-scroll z-90">
            {
                bookList?.length <= 0 ? 
                "No book found" :
                bookList.map((book, index) => (
                    <button 
                        key={book.id} 
                        className="flex w-full flex-col gap-3 items-start justify-between hover:bg-gray-100 transition-colors ease-in-out"
                        onClick={() => router.push(`/book/${book.id}`)}>
                        <SearchBookCard book={book} />
                        {index !== bookList.length - 1 && (
                            <div className="h-px w-full bg-gray-200" />
                        )}
                    </button>
                ))
            }
        </div>
    )
}

export default SearchPanel