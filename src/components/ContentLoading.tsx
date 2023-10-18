export default function ContentLoading({ spans, className, avgLength }: { spans?: number, className?: string, avgLength?: number }) {
    
    return (<div className={"flex flex-col items-center gap-2"}>
        {Array.from(Array(spans || 1).keys()).map((i) => <span className={(className || "") + " w-fit overflow-hidden h-4 bg-neutral-600 animate-pulse rounded-xl text-transparent inline"} key={i}>{Math.random().toString(20).substring((avgLength || 10), length)}{Math.random().toString(20).substring((avgLength || 10), length)}</span>)}
    
    </div>)
}