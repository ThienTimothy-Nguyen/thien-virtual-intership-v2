import type { Books } from "@/types/bookApis"
import BookCard from "../book/BookCard"
import BookList from "../book/BookList"

function SuggestedBooks({ books }: {books: Books}) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">
                Suggested Books
            </h1>
            <h2 className="text-gray-600">
                Browse those books
            </h2>
            <BookList books={books}/>
        </div>
    )
}

export default SuggestedBooks