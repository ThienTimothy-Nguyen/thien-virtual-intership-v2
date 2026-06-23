"use client";
import Link from "next/link";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegBookmark } from "react-icons/fa";
import { BsPen } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavStore } from "@/store/NavStore";
import { useBookApiStore } from "@/store/bookApiStore";
import { useAuthModalStore } from "@/store/AuthModalStore";

function NavBar() {
    const isNavOpen = useNavStore(state => state.isNavOpen);
    const onRoute = useNavStore(state => state.onRoute);
    const showAudioPlayer = useBookApiStore(state => state.showAudioPlayer);
    const currentUser = useAuthModalStore(state => state.currentUser)
    const closeNav = useNavStore(state => state.closeNav);

    async function handleSignOut() {
        if (!currentUser) {
            alert("You are already signed out")
            return
        }
        await signOut(auth)
        alert("You have been successfully signed out.")
    }

    return (
        <div className="flex">
            <div className={`-left-full md:left-0 py-5 fixed ease-in-out duration-400 
                            h-screen w-52 flex flex-col items-start gap-4 bg-gray-100 z-50 overflow-scroll
                            ${isNavOpen && "left-0 w-[60%]"} 
                            ${showAudioPlayer && "max-h-[73%] md:max-h-[85%]"}`}>
                <Link 
                    href={"/"}
                    className="px-5 max-w-56">
                    <img loading="lazy" 
                        src="/assets/logo.png" 
                        alt="logo" 
                        className="w-full"/>
                </Link>
                <div className="flex flex-col w-full justify-between h-full overflow-scroll">
                    <div className="flex flex-col text-lg w-full">
                        <Link href={"/for-you"}
                            className="p-3 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                            {onRoute === "/for-you" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                            <TiHomeOutline size={24} />
                            For you
                        </Link>
                        <Link href={"/library"}
                            className="p-3 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                            {onRoute === "/library" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                            <FaRegBookmark size={22} />
                            My library
                        </Link>
                        <span className="p-3 relative pl-8 cursor-not-allowed flex items-center gap-2">
                            <BsPen size={22} />
                            Highlights
                        </span>
                        <span className="p-3 relative pl-8 cursor-not-allowed flex items-center gap-2">
                            <IoSearch size={24} />
                            Search
                        </span>
                    </div>
                    <div className="flex flex-col w-full text-[18px]">
                        <Link href={"/settings"} 
                            className="p-3 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                            {onRoute === "/settings" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                            <IoSettingsOutline size={24} />
                            Settings
                        </Link>
                        <span className="p-3 relative pl-8 flex items-center gap-2">
                            <AiOutlineQuestionCircle size={24}/>
                            Help & Support
                        </span>
                        <button
                            className="p-3 relative pl-8 flex items-center gap-2 hover:bg-gray-200"
                            onClick={() => handleSignOut()}>
                            <IoLogOutOutline size={24}/>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {isNavOpen && <div 
                onClick={() => closeNav()}
                className="bg-gray-400 opacity-55 h-screen w-screen fixed z-25">
            </div>}
        </div>
    )
}

export default NavBar