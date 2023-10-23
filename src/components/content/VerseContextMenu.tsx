"use client";

import { highlightColors } from "@/lib/highlightColors";
import { BibleResponse } from "@/types/BibleResponse";
import { HighlightColor } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBoxArrowUpRight, BsCheckCircle, BsCircleFill, BsClipboard, BsX } from "react-icons/bs";
import { LuHighlighter } from "react-icons/lu";
import { useQueryClient } from "react-query";

interface VerseContextMenuProps {
    readonly version: string;
    readonly data: BibleResponse;
    readonly location: { x: number, y: number };
    readonly highlighted: boolean | undefined;
}

export function VerseContextMenu({ version, data, location, highlighted }: VerseContextMenuProps) {
    const { data: session } = useSession();

    const [copied, setCopied] = useState(false);
    const [previousLocation, setPreviousLocation] = useState<{x: number, y: number} | null>(null);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (previousLocation != location) {
            setPreviousLocation(location);
            setCopied(false);
        }
        return;
    }, [location, previousLocation])
    function highlightVerse(color: HighlightColor) {
        return fetch(`/api/bible/highlight?passage=${data.book.b}.${data.chapter}.${data.verse}&color=${color}`, { method: "POST" }).then(() => {
            queryClient.invalidateQueries(['highlights'])
        });
    }
    function deleteHighlight() {
        return fetch(`/api/bible/highlight?passage=${data.book.b}.${data.chapter}.${data.verse}`, { method: "DELETE" }).then(() => {
            queryClient.invalidateQueries(['highlights'])
        });
    }
    function copyVerse() {
        navigator.clipboard.writeText(`"${data.content}"\n\n${data.book.n} ${data.chapter}:${data.verse} ${version}\n${process.env.NEXT_PUBLIC_SITE_URL}/bible/${data.book.b}.${data.chapter}.${data.verse}?version=${version}`)
        setCopied(true);
    }
    return (<span className={"absolute dark:bg-neutral-800 bg-neutral-200 border dark:border-neutral-500 border-neutral-400 p-2 rounded-2xl z-20 flex flex-col gap-2 animate-scaleUp origin-bottom-left"} 
    style={{ left: location.x + "px", top: (location.y-240) + "px" }}>
        <h1 className={"text-2xl font-inter"}>{data.book.n} {data.chapter}:{data.verse}</h1>
        <span className={"items-row gap-2 text-2xl"}>
            <span onClick={() => copyVerse()} className={`${copied ? "dark:text-green-400 text-green-600" : "link-hover"}`}>{copied ? <BsCheckCircle/> : <BsClipboard/>}</span>
            <a className={`${session ? "group" : "dark:text-neutral-600 text-neutral-400"} relative overflow-visible`}>
                <LuHighlighter className={"group-hover:link-hover"}/>
                <span className={"scale-0 group-hover:scale-100 transition-all origin-bottom-left items-row absolute text-lg gap-2 -translate-y-14 dark:bg-neutral-800 bg-neutral-200 border dark:border-neutral-500 border-neutral-400 p-2 rounded-2xl"}>
                    {Object.keys(highlightColors).map((i) => 
                        <span key={i}
                        onClick={() => highlightVerse(i as HighlightColor)}
                        className={`cursor-pointer dark:text-${highlightColors[i as HighlightColor].dark} text-${highlightColors[i as HighlightColor].light}`}>
                            <BsCircleFill/>
                        </span>
                    )}
                    {highlighted ? 
                    <span key={"DELETE"}
                    onClick={() => deleteHighlight()}
                    className={`cursor-pointer dark:text-white text-black`}>
                        <BsX/>
                    </span>
                    : ""}
                    
                </span>
            </a>
            <Link className={"link-hover"} href={`/bible/${data.book.b}.${data.chapter}.${data.verse}?version=${version}`}><BsBoxArrowUpRight/></Link>
        </span>
    </span>)
}