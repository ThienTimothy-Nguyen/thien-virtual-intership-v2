"use client"
import { useBookApiStore } from "@/store/bookApiStore"
import PlayerControl from "./PlayerControl";
import { useRef, useState } from "react";
import PlayerProgressBar from "./PlayerProgressBar";

function AudioPlayer() {
    const book = useBookApiStore(state => state.book);
    const showAudioPlayer = useBookApiStore(state => state.showAudioPlayer);
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0)
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);
    
    if (!showAudioPlayer) return
    if (!book) return

    function handleProgressChange(changeValue: number): void {
        if (audioRef?.current && progressBarRef?.current) {
            const newTime = Number(progressBarRef.current.value) + changeValue;
            audioRef.current.currentTime = newTime;
            setTimeProgress(newTime)
            progressBarRef.current.style.setProperty(
                "--range-progress",
                `${(newTime / duration) * 100}%`
            )
        }
    }

    return (
        <div className="fixed flex flex-col md:flex-row justify-around items-center bottom-0 left-0 p-4 bg-[#0B2A4A] w-screen z-80 h-[28%] md:h-[15%]">
            <div className="flex justify-center items-center gap-4">
                <figure className="w-14">
                    <img className="w-full" src={book.imageLink} alt="bookImage" />
                </figure>
                <div className="flex flex-col text-sm">
                    <h3 className="text-white font-semibold text-truncate">{book.title}</h3>
                    <h3 className="text-gray-300">{book.author}</h3>
                </div>
            </div>
            <PlayerControl 
                book={book} 
                progressBarRef={progressBarRef}
                audioRef={audioRef}
                duration={duration}
                setDuration={setDuration}
                setTimeProgress={setTimeProgress}
                handleProgressChange={handleProgressChange}
            />
            <PlayerProgressBar 
                progressBarRef={progressBarRef}
                timeProgress={timeProgress}
                duration={duration}
                handleProgressChange={handleProgressChange}
            />
        </div>
    )
}

export default AudioPlayer