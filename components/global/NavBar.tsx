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
import { auth } from '@/firebase';
import { useNavStore } from "@/store/NavStore";

function NavBar() {

    const isNavOpen = useNavStore(state => state.isNavOpen);
    const closeNav = useNavStore(state => state.closeNav);
    const onRoute = useNavStore(state => state.onRoute)

    function handleSignOut() {
        signOut(auth)
        alert("You have been signed out")
    }

    return (
        <div className="flex">
            <div className={`-translate-x-full py-5 md:translate-x-0 fixed ease-in-out duration-400 
                            h-screen w-52 flex flex-col items-start justify-between bg-gray-100 z-50 }
                            ${isNavOpen && "translate-x-0 w-[60%]"}`}>
                <div className="flex flex-col gap-13 w-full">
                    <figure className="px-5 max-w-56">
                        <img 
                            src="/assets/logo.png" 
                            alt="logo" 
                            className="w-full"/>
                    </figure>
                    <div className="flex flex-col text-lg w-full">
                        <Link href={"/for-you"}
                            className="p-4 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                            {onRoute === "/for-you" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                            <TiHomeOutline size={24} />
                            For you
                        </Link>
                        <Link href={"/library"}
                            className="p-4 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                            {onRoute === "/library" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                            <FaRegBookmark size={22} />
                            My library
                        </Link>
                        <span className="p-4 relative pl-8 cursor-not-allowed flex items-center gap-2">
                            <BsPen size={22} />
                            Highlights
                        </span>
                        <span className="p-4 relative pl-8 cursor-not-allowed flex items-center gap-2">
                            <IoSearch size={24} />
                            Search
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full text-[18px]">
                    <Link href={"/settings"} 
                        className="p-4 relative pl-8 flex items-center gap-2 hover:bg-gray-200">
                        {onRoute === "/settings" && <div className="absolute left-0 h-full w-2 bg-green-400"></div>}
                        <IoSettingsOutline size={24} />
                        Settings
                    </Link>
                    <span className="p-4 relative pl-8 flex items-center gap-2">
                        <AiOutlineQuestionCircle size={24}/>
                        Help & Support
                    </span>
                    <button
                        className="p-4 relative pl-8 flex items-center gap-2 hover:bg-gray-200"
                        onClick={() => handleSignOut()}
                    >
                        <IoLogOutOutline size={24}/>
                        Logout
                    </button>
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