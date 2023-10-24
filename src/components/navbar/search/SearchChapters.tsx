import { MouseEvent, useState, useRef, useEffect } from "react";

export function SearchChapters({ chapters = 1, value, onChange }: { 
    value: number, 
    chapters?: number, 
    onChange: (event: any) => void
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLSpanElement | null>(null)
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (open && ref.current && buttonRef.current && !ref.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node)) setOpen(false)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [open])
    
    function openChapters(e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) {
        e.preventDefault();
        setOpen(!open);
    }
    function setChapter(ch: number) {
        onChange(ch);
        setOpen(false);
    }
    if (!value) onChange(1);
    if (chapters < value) onChange(chapters);
    return (<>
    <span ref={buttonRef} className={"flex flex-col justify-center items-center cursor-pointer hover:dark:bg-stone-500 hover:bg-stone-200 transition-all dark:bg-stone-700 bg-stone-400 dark:border-white border-gray-800 border-2 rounded-xl h-9 w-9 select-none"} onClick={(e) => openChapters(e)}>{value || 1}</span>
    <div ref={ref} className={`flex flex-col absolute top-full max-md:left-0 max-md:w-screen dark:bg-neutral-800 bg-neutral-200 transition-all origin-top ${open ? "scale-100" : "scale-0"} rounded-2xl border dark:border-white border-gray-800 overflow-hidden`}>
            <h1 className={"text-3xl font-playfair-display text-center py-1"}>Chapters</h1>
            <div className={"grid grid-cols-7 gap-2 p-2 max-h-96 overflow-y-scroll"}> 
                {Array.from(Array(chapters+1).keys()).slice(1).map((i) => 
                <span className={`flex flex-col place-self-center justify-center items-center border-2 dark:border-white border-gray-800 cursor-pointer hover:dark:bg-stone-500 hover:bg-stone-200 transition-all ${value == i ? "dark:bg-stone-500 bg-stone-200" : "dark:bg-stone-700 bg-stone-400"} rounded-xl h-9 w-9`} 
                onClick={() => setChapter(i)} key={i}>{i}</span>
                )}
            </div>
        </div></>
    
    )
}