"use client";
import { BsList, BsPersonDown } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import Image from "next/image";
export function UserButton() {
    const { data: session } = useSession();
    function onToggle() {

    }
    return (<div>
        <button aria-label={"User Menu"} className={"m-2 items-row text-2xl"}>
            <BsList/>
            {session?.user?.image ? <Image className={"rounded-xl"} width={32} height={32} src={session?.user?.image} alt={"Profile icon"} /> : <BsPersonDown/>}
        </button>
        
        </div>)
}