"use client";
import BibleContent from "@/components/BibleContent";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function Search({ params }: { params: { search: string}}) {
    const searchParams = useSearchParams();
    return (<BibleContent version={searchParams.get('version') || 'kjv'} search={params.search}/>)
}