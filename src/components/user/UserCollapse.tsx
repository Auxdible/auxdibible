"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ElementType, PropsWithRef } from "react";
import { MiniProfile } from "./MiniProfile";
import { BsDoorOpen, BsGear, BsPersonAdd } from "react-icons/bs";

export function UserCollapse({ collapsed }: { collapsed: boolean }) {
    const { data: session } = useSession();
    return (
    <nav className={`fixed h-screen md:w-80 top-0 left-0 dark:bg-neutral-700 p-2 bg-neutral-400 border-r-2 dark:border-neutral-600 border-neutral-500  z-50 ${collapsed ? "-translate-x-full" : ""} transition-all`}>
        <div>
            <h1 className={"text-3xl max-md:text-2xl font-playfair-display items-row gap-2"}><BsGear/> Settings</h1>
            <ul className={"my-5 flex flex-col"}>
                <li className={"border-b-2 py-2 dark:border-neutral-600 border-neutral-500"}>
                    {session?.user ? 
                        <MiniProfile 
                            imageURL={session.user.image || undefined}
                            name={session.user?.name || ""}
                            tag={"@auxdible"}
                        /> : 
                        <Link className={"items-row gap-2 cursor-pointer font-inter text-2xl max-md:text-lg"} href={"/"}><BsPersonAdd/> Sign in</Link>
                    }
                </li>
                <li>
                    <span>
                        {session?.user ? 
                            <span className={"items-row gap-2 cursor-pointer font-inter text-2xl max-md:text-lg border-b-2 py-2 dark:border-neutral-600 border-neutral-500"} onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                                <BsDoorOpen/> Sign out
                            </span> : ""
                        }
                    </span>
                </li>
            </ul>
        </div>
    </nav>
    );
}