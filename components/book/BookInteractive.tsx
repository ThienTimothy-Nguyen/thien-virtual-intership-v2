"use client";

import type { Book, Books } from "@/types/bookApis";
import { FaBookmark, FaRegBookmark, FaRegStar } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TiMicrophoneOutline } from "react-icons/ti";
import { VscBook } from "react-icons/vsc";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { useSubscriptionStore } from "@/store/SubscriptionStore";
import { useRouter } from "next/navigation";
import { doc, getDocs, setDoc, collection, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

function BookInteractive({ book }: {book: Book}) {
    const openAuthModal = useAuthModalStore(state => state.openAuthModal);
    const isAuthLoading = useAuthModalStore(state => state.isAuthLoading);
    const currentUser = useAuthModalStore(state => state.currentUser);
    const isSubscribed = useSubscriptionStore(state => state.isSubscribed);
    const [isBookSaved, setIsBookSaved] = useState(false)
    const router = useRouter();

    useEffect(() => {
        async function checkSavedBooks() {
            if (!currentUser) return
            const { docs } = await getDocs(collection(db, "users", currentUser.uid, "savedBooks"));
            const booksData = docs.map((element) => ({...element.data(), id: element.id})) as Books;

            booksData.map((item) => item?.id).includes(book?.id) ? 
                setIsBookSaved(true) :
                setIsBookSaved(false)
        }

        checkSavedBooks()
    }, [currentUser, book])

    function handleBookAccess() {
        if (!currentUser) {
            openAuthModal()
        }
        else if (book.subscriptionRequired) {
            if (!isSubscribed) {
                router.push("/choose-plan")
            }
        }
        else router.push(`/player/${book.id}`)

        return null
    }

    async function addToLibrary() {
        if (!currentUser) {
            openAuthModal()
        } else if (currentUser.isAnonymous) {
            alert("This feature isn't available for guest login. Please use another login method.")
        } else {
            const bookRef = doc(db, "users", currentUser.uid, "savedBooks", book.id)
            await setDoc(bookRef, {
                id: book.id,
                author: book.author,
                title: book.title,
                subTitle: book.subTitle,
                imageLink: book.imageLink,
                audioLink: book.audioLink,
                totalRating: book.totalRating,
                averageRating: book.averageRating,
                keyIdeas: book.keyIdeas,
                type: book.type,
                status: book.status,
                subscriptionRequired: book.subscriptionRequired,
                summary: book.summary,
                tags: book.tags,
                bookDescription: book.bookDescription,
                authorDescription: book.authorDescription,
            })
            setIsBookSaved(true)
        }
    }

    async function deleteFromLibrary() {
        if (!currentUser) {
            openAuthModal()
        }
        else {
            const bookRef = doc(db, "users", currentUser.uid, "savedBooks", book.id );
            await deleteDoc(bookRef)
            setIsBookSaved(false)
        }
    }

    return (
        <div className="flex flex-col items-start justify-between gap-7">
            <figure className="w-full flex justify-center items-center">
                <img className="w-74" src={book.imageLink} alt="bookImage" />
            </figure>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold">{book.title} {book.subscriptionRequired && "(Premium)"}</h1>
                <h3 className="text-lg font-bold">{book.author}</h3>
                <h2 className="text-[22px]  text-gray-600">{book.subTitle}</h2>
                <div className="w-full flex py-4 border-gray-200 border-b-2 border-t-2">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-[16px] font-medium">
                        <div className="flex items-center gap-2">
                            <FaRegStar size={22} />
                            <h3>{`${book.averageRating} (${book.totalRating})`}</h3> 
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock size={22} />
                            <h3>03:24</h3>
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
                {!isAuthLoading && <div className="flex gap-5 text-white font-medium">
                    <button
                        onClick={() => handleBookAccess()} 
                        className="w-35 hover:bg-blue-800 duration-300 ease-in-out flex items-center justify-center gap-2 h-12 rounded-md bg-blue-950">
                        <VscBook size={22} />
                        <h3>Read</h3>
                    </button>
                    <button
                        onClick={() => handleBookAccess()} 
                        className="w-35 hover:bg-blue-800 duration-300 ease-in-out flex items-center justify-center gap-1 h-12 rounded-md bg-blue-950">
                        <TiMicrophoneOutline size={24}/>
                        <h3>Listen</h3>
                    </button>
                </div>}
                <button 
                    className="hover:text-blue-900 duration-300 ease-in-out flex items-center gap-2 text-start text-lg font-semibold text-blue-500"
                    onClick={() => {
                        {
                            !isBookSaved ? 
                            addToLibrary() :
                            deleteFromLibrary()
                        }
                        }
                    }>
                    {!isBookSaved ? 
                        <FaRegBookmark size={22} /> :
                        <FaBookmark size={22} />}
                    {!isBookSaved ? 
                        <h3>Add to My Library</h3> :
                        <h3>Saved in My Library</h3>}
                </button>
            </div>
        </div>
    )
}

export default BookInteractive