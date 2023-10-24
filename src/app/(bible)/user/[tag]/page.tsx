"use client";

import { ContentLoading } from "@/components/ContentLoading";
import { MiniHighlight } from "@/components/user/MiniHighlight";
import { UserNotFound } from "@/components/user/UserNotFound";
import { UserData } from "@/types/UserData";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "react-query";

export default function UserInfoPage({ params }: { params: { tag: string }}) {
    const searchParams = useSearchParams();
    const [limit, setLimit] = useState(5);
    const { data, status } = useQuery<UserData | undefined, Error>(['userdata', params.tag], async () => {
        return await fetch(`/api/users?search=${params.tag}`).then(async (data) => await data.json().then((i) => {
            const response = i.users as UserData[];
            return response[0];
        })).catch(() => undefined);
    });
    if (!data && status != "loading") return <UserNotFound/>
    return (<div className={"overflow-x-hidden relative z-0 w-full"}>
    
    <header className={"mx-auto my-5 max-w-4xl flex max-md:flex-col max-md:items-center max-md:text-center gap-2 justify-center"}>

        {data?.image ? <Image
        src={data.image}
        alt={"User profile icon"}
        width={128}
        height={128}
        quality={100}
        className={"rounded-2xl"}
        /> : <div className={"w-32 h-32 dark:bg-neutral-600 bg-neutral-400 rounded-2xl"}></div>}

        <span className={"min-h-full border-neutral-600 dark:border-neutral-400 w-2 border-r-2 max-md:hidden"}></span>

        <span className={"flex flex-col justify-between gap-0"}>
        {data ? <>
            <span className={"text-5xl max-md:text-4xl font-montserrat"}>{data.name}</span>
            <span className={"text-2xl max-md:text-xl font-inter h-fit dark:text-gray-400 text-gray-700"}>@{data.tag}</span>
            <span className={"text-2xl max-md:text-xl font-inter h-fit dark:text-gray-400 text-gray-700"}>Highlights: {data.highlights.length}</span>
        </> : <>
        <ContentLoading className={"text-5xl max-md:text-4xl"} avgLength={20}/>
        <ContentLoading className={"text-2xl max-md:text-xl"} avgLength={15}/>
        <ContentLoading className={"text-2xl max-md:text-xl"} avgLength={10}/>
        </>} 
        </span>
    </header>
    <section className={"flex flex-col items-center gap-5 my-32"}>
        <h1 className={"font-playfair-display text-6xl max-md:text-5xl text-center"}>User Highlights</h1>
        {data ? <>
        <ul className={"max-w-xl flex flex-col mx-auto gap-10"}>
            {data.highlights.toReversed().slice(0,limit).map(i => (<li key={i.passage + "-" + i.color}><MiniHighlight version={searchParams.get('version') || 'kjv'} highlight={i}/></li>))}
        </ul>
        {data.highlights.length > limit ? 
        <button onClick={() => setLimit(limit+5)} className={"text-2xl items-row gap-2 font-inter dark:bg-neutral-600 bg-neutral-200 border dark:border-neutral-400 border-neutral-700 p-1 rounded-xl "}><BsSearch/> More</button> 
        : ""}
        </>
        : ""}
    </section>
    
    </div>);
}