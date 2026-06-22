"use client";
import type { Book } from "@/types/bookApis";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

function SelectedBook ({book}: {book: Book}) {
    const [bookAudioDuration, setBookAudioDuration] = useState<string>("");
    const router = useRouter();

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

            return `${formatMin} mins ${formatSec} secs`
        }

        return () => {
            audio.onloadedmetadata = null;
            audio.onerror = null;
            audio.src = "";
        }
    },[book.audioLink])
    
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">Selected just for you</h1>
            <button 
                onClick={() => {router.push(`book/${book.id}`)}}
                className="bg-orange-100 max-w-2xl rounded-lg p-6 flex flex-col lg:flex-row justify-between lg:justify-start gap-5 text-start">
                <h1 className="text-[16px] truncate lg:text-wrap lg:max-w-54">{book.subTitle}</h1>
                <div className="bg-gray-300 w-px hidden lg:block"></div>
                <div className="flex gap-4 items-center">
                    <figure className="max-w-32 flex-none">
                        <img className="w-full" src={book.imageLink} alt="bookImage" />
                    </figure>
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold">{book.title}</h1>
                        <h2 className="text-gray-600 text-sm">By {book.author}</h2>
                        <div className="flex gap-2 items-center">
                            <FaRegCirclePlay size={40} />
                            <h2 className="text-sm">{bookAudioDuration}</h2>
                        </div>
                    </div>
                    
                </div>
            </button>
        </div>
  )
}

export default SelectedBook