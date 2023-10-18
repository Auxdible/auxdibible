"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode}) {
    return (
    <SessionProvider>
        <QueryClientProvider client={client}>
            <ThemeProvider attribute={"class"} enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    </SessionProvider>
    )
}