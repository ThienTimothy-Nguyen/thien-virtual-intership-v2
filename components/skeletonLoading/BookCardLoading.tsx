
function BookCardLoading() {
    return (
        <button className="animate-pulse flex flex-col min-w-46 max-w-46 pt-6 gap-1 items-start p-3 rounded-sm">
            <div className="w-full bg-gray-400 h-40"></div>
            <h1 className="w-[80%] h-4 bg-gray-400"></h1>
            <h2 className="w-[60%] h-4 bg-gray-400"></h2>
            <h2 className="w-[60%] h-4 bg-gray-400"></h2>
            <div className="flex gap-4">
                <div className="flex justify-center items-center gap-2">
                    <h3 className="h-3 w-10 bg-gray-400"></h3>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <h3 className=" h-3 w-10 bg-gray-400"></h3> 
                </div>
            </div>
        </button>
    )
}

export default BookCardLoading