import { highlightColors } from "@/lib/highlightColors";
import { BibleResponse } from "@/types/BibleResponse";
import { Highlight } from "@prisma/client";
import Link from "next/link";
import { useQuery } from "react-query";
import { ContentLoading } from "../ContentLoading";

interface MiniHighlightProps { 
    readonly highlight: Highlight;
    readonly version: string;
}
export function MiniHighlight({ highlight, version }: MiniHighlightProps) {
    const { data, status } = useQuery<BibleResponse>(["search", highlight.passage, version], async () => {
        return fetch(`/api/bible/${version}?search=${highlight.passage}`).then((data) => data.json()
        .then((json) => {
            return json?.data[0];
        })).catch(() => undefined);
    });
    if (!data && status != 'loading') return (<></>);
    return (<div className={"flex flex-col gap-2 dark:bg-neutral-600 bg-neutral-200 border dark:border-neutral-400 border-neutral-700 rounded-2xl p-4 w-full mx-auto"}>
        {data ? <>
            <Link href={`/bible/${highlight.passage}?version=${version}`} className={"font-playfair-display text-4xl w-fit before:underline-custom relative before:hover:scale-100"}>{data.book.n} {data.chapter}:{data.verse}</Link> 
            <span className={`first-of-type:rounded-l-xl 
        last-of-type:rounded-r-xl transition-all p-0.5 w-fit
        ${highlight ? `dark:bg-${highlightColors[highlight.color].dark} bg-${highlightColors[highlight.color].light}` : ""}`}>
            <span aria-label={"verse"} className={"text-xs h-full font-bold"}> {data.verse} </span>
            <span aria-label={"verse"} className={"font-inter"} dangerouslySetInnerHTML={{ __html: data.content + " " }}></span>
        </span>
        </>
        
        : <>
        <ContentLoading className={"text-4xl w-fit"} avgLength={12}/>
        <ContentLoading className={""} spans={3} avgLength={30}/>
    </>}
    </div>)
}