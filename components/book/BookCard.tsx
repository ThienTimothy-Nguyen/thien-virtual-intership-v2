"use client";
import type { Book } from "@/types/bookApis";
import { FiClock } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BookCard({ book }: {book: Book}) {
    const router = useRouter();
    const formatRating = book.averageRating.toString().padEnd(3,".0")
    const [bookAudioDuration, setBookAudioDuration] = useState<string | null>(null);
    
    useEffect(() => {
        if (!book.audioLink) return;

        const audio = new Audio();

        audio.preload = "metadata";
        audio.src = book.audioLink;

        audio.onloadedmetadata = () => {
            setBookAudioDuration(formatDuration(audio.duration))
        }       

        function formatDuration(totalSec: number): string {
            const min = Math.floor(totalSec / 60);
            const sec = Math.floor(totalSec % 60);

            const formatMin = min.toString().padStart(2, "0");
            const formatSec = sec.toString().padStart(2, "0");

            return `${formatMin}:${formatSec}`
        }

        return () => {
            audio.onloadedmetadata = null;
            audio.onerror = null;
            audio.src = "";
        }
    },[book.audioLink])

    return (
        <button 
            className="flex text-start flex-col hover:bg-gray-100 min-w-46 max-w-46 pt-6 gap-1 items-start p-3 rounded-sm"
            onClick={() => router.push(`/book/${book.id}`)}>
            <figure className="w-full mb-1 relative flex">
                {book.subscriptionRequired && 
                <h5 className="absolute bg-black text-white font-semibold text-[12px] px-2 rounded-xl -top-6 right-1">
                    Premium
                </h5>}
                <img className="w-full" src={book.imageLink} alt="bookImage" />
            </figure>
            <h1 className="font-bold text-lg leading-5 ">{book.title}</h1>
            <h2 className="text-gray-500 text-sm">{book.author}</h2>
            <h2 className="text-sm font-semibold text-gray-500">{book.subTitle}</h2>
            <div className="flex gap-4 text-gray-500">
                <div className="flex justify-center items-center gap-1">
                    <FiClock />
                    <h3 className="text-sm">{bookAudioDuration}</h3>
                </div>
                <div className="flex justify-center gap-1">
                    <FaRegStar />
                    <h3 className="text-sm">{formatRating}</h3> 
                </div>
            </div>
        </button>
    )
}

export default BookCard