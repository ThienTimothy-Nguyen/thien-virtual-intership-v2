import type { Book } from "@/types/bookApis"

function BookDescription({ book }: {book: Book}) {
    return (
        <div className="flex flex-col justify-between gap-4">
            <h1 className="text-xl font-bold">What's it about?</h1>
            <div className="flex gap-5">
                {book.tags.map((tag, idx) => (
                    <div key={idx} className="p-4 text-sm font-medium rounded-md bg-gray-100">
                        {tag}
                    </div>
                ))}
            </div>
            <p className="text-[14px]">{book.bookDescription}</p>
            <h1 className="text-xl font-bold">About the author</h1>
            <p className="text-[14px]">{book.authorDescription}</p>
        </div>
    )
}

export default BookDescription