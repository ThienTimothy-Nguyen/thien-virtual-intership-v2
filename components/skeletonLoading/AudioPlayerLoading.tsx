import { FaPlay } from "react-icons/fa6"
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri"

function AudioPlayerLoading() {
    return (
        <div className="fixed flex flex-col md:flex-row justify-around items-center bottom-0 left-0 p-4 bg-[#0B2A4A] w-screen z-80 h-[28%] md:h-[15%]">
            <div className="flex justify-center items-center gap-4">
                <div className="w-14 bg-gray-400 animate-pulse h-20">
                </div>
                <div className="flex flex-col text-sm gap-2">
                    <h3 className="bg-gray-400 animate-pulse w-24 h-5"></h3>
                    <h3 className="bg-gray-400 animate-pulse w-24 h-5"></h3>
                </div>
            </div>
            <div className="flex gap-7 justify-center items-center">
                <button className="text-white">
                    <RiReplay10Fill size={28} />
                </button>
                <button>
                    <FaPlay className="bg-white rounded-[50%] p-1.75 pr-1" size={38} /> 
                </button>
                <button className="text-white">
                    <RiForward10Fill size={28} />
                </button>
            </div>
            <div className="flex justify-center items-center w-80 text-white gap-4">
                <h3 className="whitespace-nowrap">--:--</h3>
                <input 
                    className=""
                    defaultValue="0"
                    type="range" />
                <h3 className="whitespace-nowrap">--:--</h3>
            </div>
        </div>
    )
}

export default AudioPlayerLoading