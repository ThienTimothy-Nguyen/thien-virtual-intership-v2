"use client"
import { Book } from "@/types/bookApis";
import { RefObject, SetStateAction, useEffect, useRef, useState, Dispatch } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import FinishedBookWatcher from "../watcher/FinishedBookWatcher";

type PlayerControlProps = {
    book: Book;
    progressBarRef: RefObject<HTMLInputElement | null>;
    audioRef: RefObject<HTMLAudioElement | null>
    duration: number;
    setTimeProgress: Dispatch<SetStateAction<number>>;
    setDuration: Dispatch<SetStateAction<number>>;
    handleProgressChange: (changeValue: number) => void;
}

function PlayerControl({ 
    book,
    progressBarRef, 
    audioRef,
    duration,
    setTimeProgress,
    setDuration,
    handleProgressChange,
}: PlayerControlProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const playAnimationRef = useRef<number | null>(null);

    useEffect(() => {

        function updateProgress() {
            if (audioRef.current && progressBarRef.current && duration) {
                const currentTime = audioRef.current?.currentTime; 
                setTimeProgress(currentTime)
                progressBarRef.current.value = currentTime?.toString();
                progressBarRef.current.style.setProperty(
                    '--range-progress',
                    `${(currentTime / duration) * 100}%`,
                );
                
            }
        };

        function startAnimation() {
            if (audioRef.current && progressBarRef.current && duration) {
                const animate = () => {
                    updateProgress();
                    playAnimationRef.current = requestAnimationFrame(animate)
                }
                playAnimationRef.current = requestAnimationFrame(animate)
            }
        };


        if (isPlaying) {

            audioRef.current?.play();
            startAnimation();

        } else {

            audioRef.current?.pause();

            if (playAnimationRef.current !== null) {

                cancelAnimationFrame(playAnimationRef.current);
                playAnimationRef.current = null

            }

            updateProgress()

        }

        return () =>  {
            if (playAnimationRef.current !== null) cancelAnimationFrame(playAnimationRef.current)
        }

    }, [isPlaying, duration]);


    function onLoadedMetadata() {
        const seconds = audioRef.current?.duration;
        if (seconds !== undefined) {
            setDuration(seconds)
            if (progressBarRef.current) {
                progressBarRef.current.max = seconds.toString()
            }
        }
    };


    return (
        <div className="flex gap-7 justify-center items-center">
            <audio 
                src={book.audioLink} 
                ref={audioRef}
                onLoadedMetadata={() => onLoadedMetadata()}>
            </audio>
            <button 
                className="text-white"
                onClick={() => handleProgressChange(-10)}>
                <RiReplay10Fill size={28} />
            </button>
            <button onClick={() => setIsPlaying(prev => !prev)}>
                {!isPlaying ? 
                    <FaPlay 
                        className="bg-white rounded-[50%] p-1.75 pr-1" 
                        size={38} /> :
                    <FaPause 
                        className="bg-white rounded-[50%] p-1.75" 
                        size={38} />}
            </button>
            <button 
                className="text-white"
                onClick={() => handleProgressChange(10)}>
                <RiForward10Fill size={28} />
            </button>
            <FinishedBookWatcher 
                audioRef={audioRef} 
                book={book} />
        </div>
    )
}

export default PlayerControl