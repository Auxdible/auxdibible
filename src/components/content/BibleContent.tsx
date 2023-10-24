"use client";

import { BibleResponse } from "@/types/BibleResponse";
import { useQuery } from "react-query";
import { useContext, useEffect, useRef, useState } from 'react';
import BibleContext from "@/context/BibleContext";
import { ContentLoading } from "../ContentLoading";
import { ContentNotFound } from "./ContentNotFound";
import { VerseContextMenu } from "./VerseContextMenu";
import { Highlight } from "@prisma/client";
import { highlightColors } from "@/lib/highlightColors";

export default function BibleContent({ version, search }: { version: string, search: string }) {
    const bibleContext = useContext(BibleContext);

    const { data, status } = useQuery<BibleResponse[] | undefined, Error>(['search', search, version], async () => {
        return await fetch(`/api/bible/${version}?search=${search}`).then(async (data) => await data.json().then((i) => {
            const response = i.data as BibleResponse[];
            if (bibleContext) bibleContext.setBible({ book: response[0].book, ch: response[0].chapter });
            return response;
        })).catch(() => undefined);
    });
    const firstData = (data||[])[0];
    const { data: highlights } = useQuery<Highlight[] | undefined, Error>(['highlights', firstData?.book, firstData?.chapter], async () => {
        return await fetch(`/api/bible/highlight?passage=${firstData?.book.b}.${firstData?.chapter}`).then(async (data) => await data.json().then((i) => {
            return i.highlights as Highlight[];
        })).catch(() => undefined);
    }, {
        enabled: !!firstData
    });
    const [selectedVerse, setSelectedVerse] = useState<BibleResponse | null>(null);
    const [mouseClicked, setMouseClicked] = useState<{x: number, y: number} | null>(null);
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
        if ((ref.current && !ref.current.contains(e.target as Node)) && (!e.target || (e.target as Element).ariaLabel != "verse")) {
            setSelectedVerse(null)
            setMouseClicked(null)
        } else if (e.target && (e.target as Element).ariaLabel == "verse") {
            setMouseClicked({ x: e.pageX, y: e.pageY })
        } 
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
    }, [setSelectedVerse])
    
    if ((data == undefined || !data[0]) && status != 'loading') return <ContentNotFound/>;

    return (<div className={"overflow-x-hidden relative z-0"}>
    {/* Because of the way Tailwind CSS loads colors I have to use this solution to load the text classes for highlights. RIP */}
    <span className={"scale-0 bg-red-400 dark:bg-red-600 bg-blue-400 dark:bg-blue-600 bg-cyan-400 dark:bg-cyan-600 bg-green-400 dark:bg-green-600 bg-orange-400 dark:bg-orange-600 bg-pink-400 dark:bg-pink-600 bg-purple-400 dark:bg-purple-600 bg-yellow-400 dark:bg-yellow-600 text-red-400 dark:text-red-600 text-blue-400 dark:text-blue-600 text-cyan-400 dark:text-cyan-600 text-green-400 dark:text-green-600 text-orange-400 dark:text-orange-600 text-pink-400 dark:text-pink-600 text-purple-400 dark:text-purple-600 text-yellow-400 dark:text-yellow-600"}></span>
    {mouseClicked && selectedVerse ? 
        <span ref={ref}>
            <VerseContextMenu highlighted={!!highlights?.find((i) => i.passage == `${selectedVerse.book.b}.${selectedVerse.chapter}.${selectedVerse.verse}`)} data={selectedVerse} location={mouseClicked} version={version.toUpperCase()}/>
        </span>
        
    : ""}
    <header className={"mx-auto text-center my-5 max-w-4xl flex flex-col gap-2"}>
        
        {data && data[0] ? <>
        <h1 className={"font-playfair-display text-6xl"}>{data[0].book.n}</h1>
        <h2 className={"font-playfair-display text-5xl"}>{data[0].chapter}</h2>
        </>
        :
        <>
        <ContentLoading className={"text-6xl items-center mx-auto"} spans={1}/>
        <ContentLoading className={"text-6xl items-center mx-auto"} spans={1} avgLength={5}/>
        </>
        }
    </header>
    <section className={"max-w-4xl mx-auto indent-10 dark:bg-neutral-700 bg-gray-300 border-neutral-500 border p-4 rounded-2xl text-xl my-2"}>
    {data && data[0] ?
    data.map((i) => {
        const highlight = highlights?.find(h => h.passage == `${i.book.b}.${i.chapter}.${i.verse}`);
        return (<span key={`${i.book.b}.${i.chapter}.${i.verse}`} aria-label={"verse"} className={`cursor-pointer first-of-type:rounded-l-xl 
        last-of-type:rounded-r-xl transition-all 
        ${highlight ? `dark:bg-${highlightColors[highlight.color].dark} bg-${highlightColors[highlight.color].light}` : `${selectedVerse?.verse == i.verse ? "dark:bg-neutral-800 bg-gray-100" : ""}`}`} onClick={() => setSelectedVerse(i)}>
            <span aria-label={"verse"} className={"text-xs h-full font-bold"}> {i.verse} </span>
            <span aria-label={"verse"} className={"font-inter"} dangerouslySetInnerHTML={{ __html: i.content + " " }}></span>
        </span>)
    }
    ) :
    <ContentLoading spans={10} className={"mx-auto"}/>}
    
    </section>
    </div>);
}