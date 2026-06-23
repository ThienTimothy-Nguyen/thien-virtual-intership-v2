
function BookDetailsLoading() {
    return (
        <div className="flex flex-col items-start justify-between gap-7">
            <div className="w-full h-80 bg-gray-400 animate-pulse flex justify-center items-center">
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-extrabold bg-gray-400 animate-pulse h-8"></h1>
                <h3 className="text-lg w-[60%] font-bold bg-gray-400 animate-pulse h-5"></h3>
                <h2 className="text-[22px] w-[60%] text-gray-600 bg-gray-400 animate-pulse h-5"></h2>
                <div className="w-full flex py-4 border-gray-200 border-b-2 border-t-2">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-[16px] font-medium">
                        <div className="flex items-center gap-2 bg-gray-400 animate-pulse w-24 h-4"> 
                        </div>
                        <div className="flex items-center gap-2 bg-gray-400 animate-pulse w-24 h-4">
                        </div>
                        <div className="flex items-center gap-2 bg-gray-400 animate-pulse w-24 h-4">
                        </div>
                        <div className="flex items-center gap-2 bg-gray-400 animate-pulse w-24 h-4">
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className="flex gap-5 text-white font-medium">
                        <button
                            className="w-35 hover:bg-blue-800 duration-300 ease-in-out flex items-center justify-center gap-2 h-12 rounded-md bg-blue-950">
                            <h3>Read</h3>
                        </button>
                        <button
                            className="w-35 hover:bg-blue-800 duration-300 ease-in-out flex items-center justify-center gap-1 h-12 rounded-md bg-blue-950">
                            <h3>Listen</h3>
                        </button>
                    </div>
                    <button className="hover:text-blue-900 duration-300 ease-in-out flex items-center gap-2 text-start text-lg font-semibold text-blue-500">
                        Add to My Library
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookDetailsLoading