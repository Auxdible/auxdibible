"use client";

import * as books from '@/bible/key_english.json'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { Book } from '@/types/Book';
import { useSearchParams, useRouter } from 'next/navigation';

interface SearchFormBody {
    readonly book: number;
    readonly chapter: number;
}
const bookList: Book[] = books.books;
export default function BibleSearch() {
    const { register, handleSubmit } = useForm<SearchFormBody>();
    const [book, setBook] = useState<Book | undefined>(bookList[0]);
    const router = useRouter();
    function onSubmit(body: SearchFormBody) {
        router.push(`/bible/${body.book}.${body.chapter}`)
    }
    return (<form className={"flex flex-row gap-4 bg-neutral-300 dark:bg-neutral-600 p-2 w-fit text-xl font-montserrat rounded-xl border border-neutral-500"} onSubmit={handleSubmit(onSubmit)}>
        <select className={"rounded-lg"} { ...register('book') } onChange={(e) => setBook(bookList.find((i) => Number(e.currentTarget.value) == i.b)) } >
            {bookList.map((i) => <option key={i.b} value={i.b}>{i.n}</option>)}
        </select>
        <select className={"rounded-lg"} { ...register('chapter') } >
            {Array.from(Array((book?.c || 1) - 1).keys()).slice(1).map((i) => <option value={i} key={i}>{i}</option>)}
        </select>
        <button className={"before:underline-custom hover:before:scale-100 relative"} type={'submit'}>Read</button>
    </form>)
}