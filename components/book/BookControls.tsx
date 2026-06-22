"use client";
import { db } from '@/lib/firebase';
import { useAuthModalStore } from '@/store/AuthModalStore';
import { useSubscriptionStore } from '@/store/SubscriptionStore';
import { Book } from '@/types/bookApis';
import { User } from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { TiMicrophoneOutline } from 'react-icons/ti';
import { VscBook } from 'react-icons/vsc';

interface BookControlsProps {
    currentUser: User | null;
    book: Book;
    isBookSaved: boolean;
    setIsBookSaved: Dispatch<SetStateAction<boolean>>;
}

function BookControls({
    currentUser,
    book,
    isBookSaved,
    setIsBookSaved,
}: BookControlsProps) {
    const router = useRouter();
    const isAuthLoading = useAuthModalStore(state => state.isAuthLoading);
    const setNeedAccountUpgrade = useSubscriptionStore(state => state.setNeedAccountUpgrade)
    const isSubscribed = useSubscriptionStore(state => state.isSubscribed);
    const openAuthModal = useAuthModalStore(state => state.openAuthModal)

    function handleBookAccess() {
        if (!currentUser) {
            openAuthModal()
            return
        }
        if (book.subscriptionRequired) {
            if (!isSubscribed) {
                router.push("/choose-plan")
                return
            }
        }
        router.push(`/player/${book.id}`)

        return null
    }

    async function addToLibrary() {
        if (!currentUser) {
            openAuthModal()
        } else if (currentUser.isAnonymous) {
            openAuthModal()
            setNeedAccountUpgrade(true)
        } else {
            const bookRef = doc(db, "users", currentUser.uid, "savedBooks", book.id);

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
            const userId = currentUser.uid
            const bookRef = doc(
                db, 
                "users", 
                userId, 
                "savedBooks", 
                book.id );
            await deleteDoc(bookRef)
            setIsBookSaved(false)
        }
    }

    return (
        <div className='flex flex-col gap-5'>
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
    )
}

export default BookControls