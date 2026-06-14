"use client"
import { useBookApiStore } from "@/store/bookApiStore"
import PlayerControl from "./PlayerControl";

function AudioPlayer() {
    const book = useBookApiStore(state => state.book);
    const showAudioPlayer = useBookApiStore(state => state.showAudioPlayer)
    
    if (!showAudioPlayer) return
    if (!book) return

    return (
        <div className="fixed flex flex-col gap-5 bottom-0 left-0 p-4 bg-[#0B2A4A] w-screen z-100 h-[28%]">
            <div className="flex justify-center items-center gap-4">
                <figure className="w-14">
                    <img className="w-full" src={book.imageLink} alt="bookImage" />
                </figure>
                <div className="flex flex-col text-sm">
                    <h3 className="text-white font-semibold text-truncate">{book.title}</h3>
                    <h3 className="text-gray-300">{book.author}</h3>
                </div>
            </div>
            <PlayerControl book={book} />
        </div>
    )
}

export default AudioPlayer