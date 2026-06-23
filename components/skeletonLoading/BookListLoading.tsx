import BookCardLoading from "./BookCardLoading";

function BookListLoading() {
    return (
        <div className="flex gap-7 overflow-hidden">
            {new Array(6).fill(0).map((_, index) => (
                <BookCardLoading key={index} />
            ))}
        </div>
    )
}

export default BookListLoading