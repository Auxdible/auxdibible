"use client";
import { BsList, BsPersonDown } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UserCollapse } from "./UserCollapse";
export function UserButton() {
    const { data: session } = useSession();
    const ref = useRef<HTMLSpanElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [toggle, setToggled] = useState(true);

    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
          if (!toggle && ref.current && buttonRef.current && !ref.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node)) setToggled(true)
          
        }
        document.addEventListener("mousedown", clickedOutside)
        return () => document.removeEventListener("mousedown", clickedOutside);
      }, [toggle])
    return (<>
        <button aria-label={"User Menu"} onClick={() => setToggled(!toggle)} className={"items-row text-3xl"} ref={buttonRef}>
            <BsList/>
            {session?.user?.image ? <Image className={"rounded-xl"} width={36} height={36} src={session?.user?.image} alt={"Profile icon"} /> : <BsPersonDown/>}
        </button>
        <span ref={ref}>
        <UserCollapse collapsed={toggle} />
        </span>
        
        </>)
}