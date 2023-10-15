"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "../../components/ThemeButton";
import { useEffect, useState } from "react";
import VersionSelector from "@/components/VersionSelector";
import BibleSearch from "@/components/BibleSearch";

export default function Navigation() {
    const [previousScrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
      });
    function onScroll() {
        const visible = previousScrollPos > window.pageYOffset;
        setScrollPos(window.pageYOffset);
        setVisible(visible);
    }
    return (<><nav className={`fixed dark:bg-neutral-700 bg-neutral-400 border-b dark:border-neutral-400 border-neutral-700 w-full flex flex-row transition-transform justify-between${!visible ? " -translate-y-full" : ""}`}>
        <div className={"flex gap-6 items-center"}>
            <div>
            <Link href={"/"} className={"items-row gap-2 font-playfair-display text-4xl"}>
            <Image src={'/icon192.png'} width={48} height={48} alt={"Auxdibible logo"}/>
            <span className={"max-md:hidden"}>Auxdibible</span>
            </Link>
            </div>
            <VersionSelector/>
        </div>
        <div className={"flex items-center"}>
            <BibleSearch/>
        </div>
        <div className={"items-row px-2"}>
            <ThemeButton/>
        </div>
    </nav>
    <div className={"h-16"}></div>
    </>)
}