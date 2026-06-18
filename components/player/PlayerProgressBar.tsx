"use client";
import { RefObject } from "react";

type PlayerProgressBarProps = {
    progressBarRef: RefObject<HTMLInputElement | null>;
    timeProgress: number;
    handleProgressChange: (changeValue: number) => void;
    duration: number;
}

function PlayerProgressBar({
    progressBarRef, 
    timeProgress,
    handleProgressChange,
    duration,
}: PlayerProgressBarProps) {


    const formatTime = (time: number | undefined): string => {
        if (typeof time === 'number' && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            
            const formatMinutes= minutes.toString().padStart(2, '0');
            const formatSeconds= seconds.toString().padStart(2, '0');
            return `${formatMinutes}:${formatSeconds}`;
            }
        return '00:00';
    };
    

    return (
        <div className="flex justify-center items-center w-80 text-white gap-4">
            <h3>{formatTime(timeProgress)}</h3>
            <input 
                className=""
                ref={progressBarRef} 
                defaultValue="0"
                onChange={() => handleProgressChange(0)}
                type="range" />
            <h3>{formatTime(duration)}</h3>
        </div>
    )
}

export default PlayerProgressBar