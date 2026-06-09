import type { Book } from "@/types/bookApis";
import { FaRegCirclePlay } from "react-icons/fa6";

function SelectedBook ({book}: {book: Book}) {
    
  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-[22px] font-bold">Selected just for you</h1>
        <div className="bg-orange-100 max-w-2xl rounded-lg p-6 flex flex-col lg:flex-row justify-between lg:justify-start gap-5">
            <h1 className="text-[16px] truncate lg:text-wrap lg:max-w-54">{book.subTitle}</h1>
            <div className="bg-gray-300 w-px hidden lg:block"></div>
            <div className="flex gap-4 items-center">
                <figure className="max-w-32 flex-none">
                    <img className="w-full" src={book.imageLink} alt="bookImage" />
                </figure>
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold">{book.title}</h1>
                    <h2 className="text-gray-600 text-sm">By {book.author}</h2>
                    <div className="flex gap-2 items-center">
                        <button>
                            <FaRegCirclePlay aria-label="play button" size={40} />
                        </button>
                        
                        <h2 className="text-sm">3 mins 23 secs</h2>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SelectedBook