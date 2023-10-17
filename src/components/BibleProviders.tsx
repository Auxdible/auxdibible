"use client";

import BibleContext from "@/context/BibleContext";
import { BibleContextType } from "@/types/BibleContextType";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";


const client = new QueryClient();
export default function BibleProviders({ children }: { children: React.ReactNode}) {
    const [bible, setBible] = useState<BibleContextType | undefined>();
    return (
    <BibleContext.Provider value={{ bible, setBible }}>
        {children}
    </BibleContext.Provider>)
}