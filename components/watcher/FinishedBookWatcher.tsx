"use client";
import { db } from "@/lib/firebase";
import { useAuthModalStore } from "@/store/AuthModalStore";
import { Book } from "@/types/bookApis";
import { doc, setDoc } from "firebase/firestore";
import { RefObject, useEffect } from "react";

type FinishedBookWatcherProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  book: Book;
}

function FinishedBookWatcher({ audioRef, book }: FinishedBookWatcherProps) {
  const currentUser = useAuthModalStore(state => state.currentUser);

  useEffect(() => {

    const audio = audioRef.current;

    if (!audio || !currentUser || currentUser.isAnonymous) return;
    
    const addFinishedBook = async () => {
      const bookRef = doc(db, "users", currentUser.uid, "finished", book.id);
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
          finishedAt: new Date(),
      })
    }
    
    audio.addEventListener("ended", addFinishedBook);

    return () => {
      audio.removeEventListener("ended", addFinishedBook);
    }

  }, [audioRef, currentUser, book])
  

  return null
}

export default FinishedBookWatcher