"use client";
import BookList from '@/components/book/BookList';
import { db } from '@/lib/firebase';
import { useAuthModalStore } from '@/store/AuthModalStore';
import { Books } from '@/types/bookApis';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Page() {
  const [savedBooks, setSavedBooks] = useState<Books>([]);
  const [finishedBooks, setFinishedBooks] = useState<Books>([]);

  const currentUser = useAuthModalStore(state => state.currentUser);

  useEffect(() => {
    async function getAllBooks() {
      if (!currentUser || currentUser?.isAnonymous) return

      const savedBooksRef = collection(db, "users", currentUser.uid, "savedBooks");
      const finishedBooksRef = collection(db, "users", currentUser.uid, "finished");

      const savedBooksObjects = await getDocs(savedBooksRef);
      const finishedBooksObjects = await getDocs(finishedBooksRef);

      const savedBookList = savedBooksObjects.docs.map(book => ({...book.data()})) as Books;
      const finishedBookList = finishedBooksObjects.docs.map(book => ({...book.data()})) as Books;

      setSavedBooks(savedBookList)
      setFinishedBooks(finishedBookList)
    } 

    getAllBooks()
  }, [currentUser])

  return (
    <div className='global_container'>
      <div className='row flex flex-col gap-6'>
        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">
                Library
            </h1>
            <h2 className="text-gray-600">
                {savedBooks.length} items
            </h2>
            {savedBooks.length > 0 ? 
              <BookList books={savedBooks} /> :
              <div className='flex justify-center items-center w-full'>
                <div className='bg-gray-100 p-6 rounded-lg shadow-xl flex flex-col justify-center items-center'>
                  <h1 className='font-bold text-lg'>Save your favorite books!</h1>
                  <h1 className='text-md'>When you save a book, it will appear here.</h1>
                </div>
              </div>}
        </div>

        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">
                Finished
            </h1>
            <h2 className="text-gray-600">
                {finishedBooks.length} items
            </h2>
            {finishedBooks.length > 0 ? 
              <BookList books={finishedBooks} /> :
              <div className='flex justify-center items-center w-full'>
                <div className='bg-gray-100 p-6 rounded-lg shadow-xl flex flex-col justify-center items-center'>
                  <h1 className='font-bold text-lg'>Done and dusted!</h1>
                  <h1 className='text-md'>When you finish a book, you can find it here later.</h1>
                </div>
              </div>}
        </div>
      </div>
    </div>
  )
}

export default Page