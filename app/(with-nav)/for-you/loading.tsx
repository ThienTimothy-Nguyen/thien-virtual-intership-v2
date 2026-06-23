import BookListLoading from '@/components/skeletonLoading/BookListLoading'
import React from 'react'

function Loading() {
  return (
    <div className="global_container">
            <div className="row flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h1 className="text-[22px] font-bold">Selected just for you</h1>
                    <button 
                        className="bg-gray-400 animate-pulse max-w-2xl rounded-lg p-6 flex flex-col lg:flex-row justify-between lg:justify-start gap-5 text-start h-32">
                    </button>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-[22px] font-bold">
                        Recommended For You
                    </h1>
                    <h2 className="text-gray-600">
                        We think you'll like these
                    </h2>
                    <BookListLoading />
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-[22px] font-bold">
                        Suggested books
                    </h1>
                    <h2 className="text-gray-600">
                        Browse those books
                    </h2>
                    <BookListLoading />
                </div>
            </div>
        </div>
  )
}

export default Loading