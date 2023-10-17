"use client";

import books from '@/bible/key_english.json'
import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react';
import { Book } from '@/types/Book';
import { useRouter } from 'next/navigation';
import { BsBook } from 'react-icons/bs';
import BibleContext from '@/context/BibleContext';

interface SearchFormBody {
    readonly book: number;
    readonly chapter: number;
}
const bookList: Book[] = books.books;
export function BibleSearch({ defaultBook, defaultCh }: { defaultBook?: Book, defaultCh?: number }) {
    const { register, handleSubmit } = useForm<SearchFormBody>();
    const [book, setBook] = useState<Book | undefined>(defaultBook || bookList[0]);
    const router = useRouter();
    
    function onSubmit(body: SearchFormBody) {
        router.push(`/bible/${body.book}.${body.chapter}`)
    }
    return (<form className={"flex flex-row md:gap-4 gap-1 bg-neutral-300 dark:bg-neutral-600 p-2 w-fit max-md:flex-col items-center text-xl max-md:text-base font-montserrat rounded-xl border border-neutral-500"} onSubmit={handleSubmit(onSubmit)}>
        <section className={"items-row gap-2"}>
        <select defaultValue={book?.b || 1} className={"rounded-lg"} { ...register('book') } onChange={(e) => setBook(bookList.find((i) => Number(e.currentTarget.value) == i.b)) } >
            {bookList.map((i) => <option key={i.b} value={i.b}>{i.n}</option>)}
        </select>
        <select defaultValue={defaultCh || 1} className={"rounded-lg"} { ...register('chapter') } >
            {Array.from(Array((book?.c || 1) - 1).keys()).slice(1).map((i) => <option value={i} key={i}>{i}</option>)}
        </select>
        </section>
        
        <button className={"before:underline-custom hover:before:scale-100 relative items-row gap-2"} type={'submit'}><BsBook/> Read</button>
    </form>)
}