export const revalidate = 3600;

import RecommendedForYou from "@/components/for-you/RecommendedForYou";
import SelectedBook from "@/components/for-you/SelectedBook"
import SuggestedBooks from "@/components/for-you/SuggestedBooks";
import type { BookApis, Book } from "@/types/bookApis"

async function fetchSelectedBook() {
        const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected")
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
}

async function fetchRecommendedBooks() {
    const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

async function fetchSuggestedBooks() {
    const res = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Page() {

    const [selectedBook, recommendedBooks, suggestedBooks]: BookApis = await Promise.all([
        fetchSelectedBook(),
        fetchRecommendedBooks(),
        fetchSuggestedBooks(),
    ])


    return (
        <div className="container">
            <div className="row flex flex-col gap-6">
                <SelectedBook book={selectedBook[0]} />
                <RecommendedForYou books={recommendedBooks} />
                <SuggestedBooks books={suggestedBooks} />
            </div>
        </div>

    )
}
