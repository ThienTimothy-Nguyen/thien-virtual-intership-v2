"use client";

import type { Book, Books } from "@/types/bookApis";
import { FaRegStar } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TiMicrophoneOutline } from "react-icons/ti";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import BookControls from "./BookControls";

function BookDetails({ book }: {book: Book}) {
    const formatRating = book.averageRating.toString().padEnd(3, ".0")
    const [isBookSaved, setIsBookSaved] = useState(false);
    const currentUser = useAuthModalStore(state => state.currentUser);
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

    useEffect(() => {
        async function checkSavedBooks() {
            if (!currentUser || currentUser?.isAnonymous) {
                setIsBookSaved(false)
                return
            }
            const { docs } = await getDocs(collection(db, "users", currentUser.uid, "savedBooks"));
            const booksData = docs.map((element) => ({...element.data(), id: element.id})) as Books;

            booksData.map((item) => item?.id).includes(book?.id) ? 
                setIsBookSaved(true) :
                setIsBookSaved(false)
        }

        checkSavedBooks()
    }, [currentUser, book])

    return (
        <div className="flex flex-col items-start justify-between gap-7">
            <figure className="w-full min-h-72 flex justify-center items-center">
                <img loading="eager" className="w-74" src={book.imageLink} alt="bookImage" />
            </figure>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold">{book.title} {book.subscriptionRequired && "(Premium)"}</h1>
                <h3 className="text-lg font-bold">{book.author}</h3>
                <h2 className="text-[22px] text-gray-600">{book.subTitle}</h2>
                <div className="w-full flex py-4 border-gray-200 border-b-2 border-t-2">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-[16px] font-medium">
                        <div className="flex items-center gap-2">
                            <FaRegStar size={22} />
                            <h3>{`${formatRating} (${book.totalRating})`}</h3> 
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock size={22} />
                            <h3>{bookAudioDuration}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <TiMicrophoneOutline size={24}/>
                            <h3>{book.type}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineLightBulb size={24} />
                            <h3>{book.keyIdeas} Key ideas</h3>
                        </div>
                    </div>
                </div>
                <BookControls
                    isBookSaved = {isBookSaved}
                    setIsBookSaved={setIsBookSaved}
                    book={book}
                    currentUser={currentUser} />
            </div>
        </div>
    )
}

export default BookDetails