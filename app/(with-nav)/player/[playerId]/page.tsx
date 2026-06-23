"use client";
import { useBookApiStore } from "@/store/bookApiStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
    const { playerId } = useParams();
    const fetchBookApi = useBookApiStore(state => state.fetchBookApi);
    const book = useBookApiStore(state => state.book);
    const setShowAudioPlayer = useBookApiStore(state => state.setShowAudioPlayer);
    const isLoading = useBookApiStore(state => state.isLoading);

    useEffect(() => {
        if (!playerId) return;

        fetchBookApi(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${playerId}`)
        
    }, [playerId, fetchBookApi]) 

    useEffect(() => {
        setShowAudioPlayer(true)

        return () => setShowAudioPlayer(false)
    }, [setShowAudioPlayer])

    if (!book || isLoading) {
        return (
            <div className="global_container">
                <div className="row flex flex-col justify-start pb-[60%] md:pb-[28%]">
                    <h1 className="border-b border-gray-300 mb-4 bg-gray-400 animate-pulse h-8 w-[40%]">
                    </h1>
                    <p className="whitespace-pre-line pt-8 bg-gray-400 animate-pulse h-64 w-full">
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="global_container">
            <div className="row flex flex-col justify-start pb-[60%] md:pb-[28%]">
                <h1 className="border-b border-gray-300 font-bold text-2xl pb-4">
                    {book.title}
                </h1>
                <p className="whitespace-pre-line pt-8">
                    {book.summary}
                </p>
            </div>
        </div>
    )
}

export default Page