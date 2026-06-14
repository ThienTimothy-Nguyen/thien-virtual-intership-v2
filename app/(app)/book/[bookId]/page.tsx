"use client"
import BookDescription from "@/components/book/BookDescription";
import BookInteractive from "@/components/book/BookInteractive";
import { useBookApiStore } from "@/store/bookApiStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
    const { bookId } = useParams()
    const fetchBookApi = useBookApiStore(state => state.fetchBookApi)
    const book = useBookApiStore(state => state.book)

    useEffect(() => {
        if (!bookId) return;

        fetchBookApi(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`)
        
    }, [bookId, fetchBookApi]) 

    if (!book) return

    return (
        <div className="container">
            <div className="row flex flex-col gap-9">
                <BookInteractive book={book} />
                <BookDescription book={book} />
            </div>
        </div>
    )
}

export default Page