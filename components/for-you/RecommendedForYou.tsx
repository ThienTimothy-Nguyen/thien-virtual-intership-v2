import type { Books } from "@/types/bookApis"
import BookList from "../book/BookList"

function RecommendedForYou({ books }: {books: Books}) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-[22px] font-bold">
                Recommended For You
            </h1>
            <h2 className="text-gray-600">
                We think you'll like these
            </h2>
            <BookList books={books} />
        </div>
    )
}

export default RecommendedForYou