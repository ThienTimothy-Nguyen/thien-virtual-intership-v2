
function BookDescriptionLoading() {
    return (
        <div className="flex flex-col justify-between gap-4">
            <h1 className="text-xl font-bold">What's it about?</h1>
            <div className="flex gap-5">
                {new Array(1).fill(0).map((_, idx) => (
                    <div key={idx} className="p-4 w-48 h-6 font-medium rounded-md bg-gray-400 animate-pulse">
                    </div>
                ))}
            </div>
            <p className="bg-gray-400 animate-pulse w-full h-48"></p>
            <h1 className="text-xl font-bold">About the author</h1>
            <p className="bg-gray-400 animate-pulse w-full h-48"></p>
        </div>
    )
}

export default BookDescriptionLoading