import BookCard from './BookCard';
import { Books } from '@/types/bookApis';

function BookList({ books }: {books: Books}) {
    return (
        <div className="flex gap-7 overflow-x-scroll scrollbar-none">
            {books.length > 0 ? books.map(book => (
                <BookCard key={book.id} book={book} />
            )): null}
        </div>
    )
}

export default BookList