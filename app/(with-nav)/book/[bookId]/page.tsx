import BookDescription from "@/components/book/BookDescription";
import BookDetails from "@/components/book/BookDetails";

type BookPageProps = {
    params: Promise<{
        bookId: string;
    }>
}

async function Page({ params }: BookPageProps) {
    const { bookId } = await params;

    const fetchBookApi = async () => {
        const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`)
        if (!res.ok) {
            throw new Error("Failed to fetch book")
        }
        return res.json()
    };

    const book = await fetchBookApi();
        

    return (
        <div className="global_container">
            <div className="row flex flex-col gap-9">
                <BookDetails book={book} />
                <BookDescription book={book} />
            </div>
        </div>
    )
}

export default Page