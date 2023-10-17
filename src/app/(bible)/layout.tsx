import Navigation from "@/app/(bible)/navbar";
import BibleProviders from "@/components/BibleProviders";
import Providers from "@/components/Providers"
import '@/styles/global.scss';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Auxdibible',
  description: 'A bible app created with NextJS 13 by Auxdible.',
  
}

export default function BibleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"dark:bg-neutral-800 bg-neutral-300"}>
        <Providers>
          <BibleProviders>
            <Navigation />
            {children}
          </BibleProviders>
        </Providers>
      </body>
    </html>
  )
}
