"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { BiLoaderCircle } from "react-icons/bi";
export default function ThemeButton() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    useEffect(() => {
      if (!mounted) setMounted(true)
    }, [mounted])
    if (!mounted) {
      return (<button className={"max-md:text-xl text-2xl p-2 rounded-xl animate-spin "}>
      { <BiLoaderCircle/> }
  </button>)
    }
    return (<button aria-label={"Change Theme"} onClick={() => setTheme(theme == "dark" ? "light" : "dark")} className={"group h-[40px] w-[40px] border border-gray-400 dark:hover:text-cyan-400 hover:text-cyan-600 relative transition-all rounded-xl my-2"}>
            <div className={"overflow-hidden relative block"}>
              <div className={"flex flex-col items-center transition-transform overflow-hidden h-[39px] rounded-xl"} >
              <span className={`flex items-center text-2xl ease-out max-sm:text-xl flex-grow-0 flex-shrink-0 h-[39px] ${theme == "dark" ? "animate-themeUp" : "animate-themeDown"}`}>
              <FaMoon />
              </span>
              <span className={`flex items-center text-2xl ease-out max-sm:text-xl flex-grow-0 flex-shrink-0 h-[39px] ${theme == "light" ? "animate-theme2Up" : "animate-theme2Down"}`}>
              <FaSun />
              </span>
              </div>
              
            </div>
        </button>)
}