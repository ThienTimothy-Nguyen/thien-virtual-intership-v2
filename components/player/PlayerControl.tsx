"use client"
import { Book } from "@/types/bookApis";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import PlayerProgressBar from "./PlayerProgressBar";


function PlayerControl({ book }: {book: Book}) {
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0)
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);
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
        <div className="flex flex-col gap-5">
            <div className="flex gap-7 justify-center items-center">
                <audio 
                    src={book.audioLink} 
                    ref={audioRef}
                    onLoadedMetadata={onLoadedMetadata}>
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
            </div>
            <PlayerProgressBar 
                progressBarRef={progressBarRef}
                timeProgress={timeProgress}
                duration={duration}
                handleProgressChange={handleProgressChange}/>
        </div>
    )
}

export default PlayerControl