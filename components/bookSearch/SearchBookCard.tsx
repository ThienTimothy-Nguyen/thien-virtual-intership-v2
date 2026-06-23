"use client";
import { Book } from "@/types/bookApis";
import { useEffect, useState } from "react";

function SearchBookCard({ book }: {book: Book }) {
  const [bookAudioDuration, setBookAudioDuration] = useState<string>("--:--");
      
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
    <div
      className="flex items-center w-full justify-start text-start gap-6 p-3">
        <figure className="min-w-10 max-w-20">
          <img loading="lazy" 
            className="w-full"
            src={book.imageLink} 
            alt="bookImg" />
        </figure>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{book.title}</h1>
          <h2 className="text-sm text-gray-500">{book.author}</h2>
          <h2 className="text-sm text-gray-500">{bookAudioDuration}</h2>
        </div>
    </div>
  )
}

export default SearchBookCard