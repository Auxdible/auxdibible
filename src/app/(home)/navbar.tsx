"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "../../components/ThemeButton";
import { UIEvent, useEffect, useState } from "react";
import UserMenu from "@/components/UserMenu";

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
    return (<><nav className={`fixed w-full flex flex-row transition-transform justify-between${!visible ? " -translate-y-full" : ""}`}>
        <div className={"flex gap-6"}>
            <div>
            <Link href={"/"} className={"items-row gap-2 font-playfair-display text-4xl"}>
            <Image src={'/icon192.png'} width={48} height={48} alt={"Auxdibible logo"}/>
            <span className={"max-md:hidden"}>Auxdibible</span>
            </Link>
            </div>
            
            <div className={"items-row items-baseline gap-5 font-montserrat text-3xl"}>
            <Link href={"/bible"} className={"before:underline-custom relative hover:before:scale-100"}>
            Bible
            </Link>
            </div>
            
        </div>
        <div className={"items-row px-2"}>
            <ThemeButton/>
            <UserMenu/>
        </div>
    </nav></>)
}