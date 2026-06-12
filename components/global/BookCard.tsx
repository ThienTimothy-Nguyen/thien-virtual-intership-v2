"use client";
import type { Book } from "@/types/bookApis";
import { FiClock } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function BookCard({ book }: {book: Book}) {
    const router = useRouter()
    return (
        <button 
            className="flex text-start flex-col hover:bg-gray-100 min-w-46 pt-6 gap-1 items-start p-3 rounded-sm"
            onClick={() => router.push(`/book/${book.id}`)}>
            <figure className="w-full mb-1 relative">
                {book.subscriptionRequired && 
                <h5 className="absolute bg-black text-white font-semibold text-[12px] px-2 rounded-xl -top-6 right-1">
                    Premium
                </h5>}
                <img className="w-full" src={book.imageLink} alt="bookImage" />
            </figure>
            <h1 className="font-bold text-lg leading-5 ">{book.title}</h1>
            <h2 className="text-gray-500 text-sm">{book.author}</h2>
            <h2 className="text-sm ">{book.subTitle}</h2>
            <div className="flex gap-4 text-gray-500">
                <div className="flex justify-center items-center gap-1">
                    <FiClock />
                    <h3 className="text-sm">03:24</h3>
                </div>
                <div className="flex justify-center gap-1">
                    <FaRegStar />
                    <h3 className="text-sm">{book.averageRating}</h3> 
                </div>
            </div>
        </button>
    )
}

export default BookCard