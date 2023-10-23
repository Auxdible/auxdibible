"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "../../components/ThemeButton";
import { useEffect, useState, useContext } from "react";
import VersionSelector from "@/components/VersionSelector";
import {BibleSearch} from "@/components/search/BibleSearch";
import BibleContext from "@/context/BibleContext";
import { UserButton } from "@/components/user/UserButton";

export default function Navigation() {
    const [previousScrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const bibleContext = useContext(BibleContext);
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
      });
    function onScroll() {
        const visible = previousScrollPos > window.pageYOffset;
        setScrollPos(window.pageYOffset);
        setVisible(visible);
    }
    return (<><nav className={`fixed z-10 w-full transition-transform${!visible ? " -translate-y-full" : ""}`}>
        <section className={`dark:bg-neutral-700 bg-neutral-400 border-b dark:border-neutral-400 border-neutral-700 w-full flex flex-row justify-between`}>
        <div className={"flex gap-6 items-center"}>
            <div>
            <Link href={"/"} className={"items-row gap-2 font-playfair-display text-4xl"}>
            <Image src={'/icon192.png'} width={48} height={48} alt={"Auxdibible logo"}/>
            <span className={"max-md:hidden"}>Auxdibible</span>
            </Link>
            </div>
            <VersionSelector/>
        </div>
        
        <div className={"items-row px-2 gap-2"}>
            <UserButton visible={visible} />
            <ThemeButton/>
        </div>
    </section>
    <section className={`dark:bg-neutral-700 py-2 bg-neutral-400 border-b dark:border-neutral-400 border-neutral-700 w-full flex flex-row justify-center`}>
    <BibleSearch defaultBook={bibleContext?.bible?.book} defaultCh={bibleContext?.bible?.ch}/>
    </section>
        </nav>
    <div className={"h-36"}></div>
    </>)
}