"use client";
import { useState, useEffect } from 'react';

export function ContentLoading({ spans, className, avgLength }: { spans?: number, className?: string, avgLength?: number }) {
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        if (!mounted) setMounted(true);
        return () => {}
    }, [mounted, setMounted])
    return (<div className={"flex flex-col items-center gap-2"}>
        {Array.from(Array(spans || 1).keys()).map((i) => <span className={(className || "") + " w-fit text-base overflow-hidden bg-neutral-600 animate-pulse rounded-xl text-transparent inline"} key={i}>{(mounted ? Math.random().toString(20) : "Loading the loading...").substring(0, (avgLength || 20))}</span>)}
    
    </div>)
}