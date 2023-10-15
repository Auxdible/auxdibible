"use client";

import { BibleResponse } from "@/types/BibleResponse";
import { useQuery } from "react-query";

export default function BibleContent({ version, search }: { version: string, search: string }) {

    const { data } = useQuery(['search', search, version], async () => {
        return await fetch(`/api/bible/${version}?search=${search}`).then(async (data) => await data.json().then((i) => i.data as BibleResponse[]));
    });
    if (!data || !data[0]) return <></>;
    return (<>
    <header className={"mx-auto text-center my-5"}>
        <h1 className={"font-playfair-display text-6xl"}>{data[0].book.n}</h1>
        <h2 className={"font-playfair-display text-5xl"}>{data[0].chapter}</h2>
    </header>
    <section className={"max-w-4xl mx-auto indent-10 dark:bg-neutral-700 bg-neutral-400 border-neutral-500 border p-4 rounded-2xl text-xl my-2"}>
    {data.map((i) => <span key={`${i.book.b}.${i.chapter}.${i.verse}`}><span className={"text-xs h-full font-bold"}>{i.verse} </span><span className={"font-inter"} dangerouslySetInnerHTML={{ __html: i.content + " " }}></span></span>)}
    </section>
    </>);
}