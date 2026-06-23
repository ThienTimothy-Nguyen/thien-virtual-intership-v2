

function SearchPanelLoading() {
    const arr = new Array(2).fill(0)

    return (
        <div 
            className="absolute top-6 right-0 w-full md:right-5 md:left-auto md:w-120 shadow-2xl rounded-sm 
                        bg-white border-[1.75px] border-gray-200 p-4 max-h-[75vh] transition-all duration-300 ease-in-out
                        flex flex-col items-center overflow-scroll z-90">
            {arr.map((_, index) => (
                    <button 
                        key={index} 
                        className="flex w-full flex-col gap-3 items-start justify-between hover:bg-gray-100 transition-colors ease-in-out">
                            <div className="flex items-center w-full justify-start gap-6 p-3">
                                <div className="w-16 bg-gray-400 animate-pulse h-20">
                                </div>
                                <div className="flex flex-col gap-1 text-start">
                                    <h1 className="bg-gray-400 animate-pulse h-4 w-26"></h1>
                                    <h2 className="bg-gray-400 animate-pulse h-4 w-20"></h2>
                                    <h2 className="text-sm text-gray-500">--:--</h2>
                                </div>
                            </div>
                        {index !== arr.length - 1 && (
                            <div className="h-px w-full bg-gray-200" />
                        )}
                    </button>
                ))
            }
        </div>
    )
}

export default SearchPanelLoading