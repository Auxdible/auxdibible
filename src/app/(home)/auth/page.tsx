"use client";

import { signIn } from "next-auth/react";
import { BsGoogle, BsPersonAdd } from "react-icons/bs";

export default function AuthPage() {
    return (<main>
        <div className={"flex flex-col gap-2 min-h-screen justify-center"}>
          <div className={"flex flex-col items-center w-fit mx-auto text-center"}>
            <h1 className={"text-5xl max-md:text-3xl font-playfair-display items-row gap-4 max-md:gap-2"}><BsPersonAdd/> | Sign in to Auxdibible</h1>
            <div className={"max-w-2xl min-w-full dark:bg-neutral-600 bg-neutral-400 p-4 rounded-xl my-5 shadow-2xl "}>
            <button onClick={() => signIn('google', { callbackUrl: '/' }) } className={"text-3xl hover:text-4xl gap-2 mx-auto rounded-xl border dark:border-gray-700 border-gray-400 p-2 dark:bg-neutral-700 bg-neutral-300 transition-all"}><BsGoogle/></button>
            </div>
          </div>
        </div>
      </main>)
}