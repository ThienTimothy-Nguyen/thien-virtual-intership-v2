import BookDescriptionLoading from "@/components/skeletonLoading/BookDescriptionLoading"
import BookDetailsLoading from "@/components/skeletonLoading/BookDetailsLoading"

function Loading() {
  return (
    <div className="global_container">
            <div className="row flex flex-col gap-9">
                <BookDetailsLoading />
                <BookDescriptionLoading  />
            </div>
        </div>
  )
}

export default Loading