"use client";
import BibleContent from "@/components/content/BibleContent";
import { useSearchParams } from "next/navigation";


export default function Search({ params }: { params: { search: string}}) {
    const searchParams = useSearchParams();
    return (<BibleContent version={searchParams.get('version') || 'kjv'} search={params.search}/>)
}