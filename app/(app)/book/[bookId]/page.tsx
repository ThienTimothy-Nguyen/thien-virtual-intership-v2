import BookDescription from "@/components/book/BookDescription";
import BookInteractive from "@/components/book/BookInteractive";

type ParamsProps = {
  params: Promise<{bookId: string}>;
};

async function Page({ params }: ParamsProps) {
    const { bookId } = await params

    async function fetchBook() {
        const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    const bookData = await fetchBook()

    return (
        <div className="container">
            <div className="row flex flex-col gap-9">
                <BookInteractive book={bookData} />
                <BookDescription book={bookData} />
            </div>
        </div>
    )
}

export default Page