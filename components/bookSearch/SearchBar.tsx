"use client";
import { IoSearch } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useNavStore } from "@/store/NavStore";
import { useSearchStore } from "@/store/SearchStore";
import { RxCross2 } from "react-icons/rx";

function SearchBar() {
    const searchQuery = useSearchStore(state => state.searchQuery);
    const setSearchQuery = useSearchStore(state => state.setSearchQuery)
    const openNav = useNavStore(state => state.openNav);

    return (
        <div className="row border-b border-gray-300 relative py-5 flex justify-end items-center gap-4">
            <div className="flex w-82 overflow-hidden rounded-md border-2 border-gray-300 bg-gray-100">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => setSearchQuery("")}
                    className="flex-1 py-1 pl-3 outline-none"
                    type="text"
                    placeholder="Search by title/author"
                />
                {searchQuery.trim() ? 
                    <button 
                        className="flex items-center justify-center border-l-2 border-gray-300 px-2"
                        onClick={() => setSearchQuery("")}
                        >
                        <RxCross2 size={24} aria-label="delete search panel" />
                    </button> :
                    <div className="flex items-center justify-center border-l-2 border-gray-300 px-2">
                        <IoSearch size={24} color="black" />
                    </div> }
            </div>
            <button
                onClick={() => openNav()}
                className="block md:hidden"
                aria-label="menu button">
                <LuMenu size={30} />
            </button>
        </div>
    )
}

export default SearchBar