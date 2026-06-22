import type { Books } from "@/types/bookApis"
import BookCard from "../book/BookCard"

function SuggestedBooks({ books }: {books: Books}) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">
                Suggested Books
            </h1>
            <h2 className="text-gray-600">
                Browse those books
            </h2>
            <div className="flex gap-8 overflow-x-scroll scrollbar-none">
                {books.length > 0 ? books.map(book => (
                    <BookCard key={book.id} book={book} />
                )): null}
            </div>
        </div>
    )
}

export default SuggestedBooks