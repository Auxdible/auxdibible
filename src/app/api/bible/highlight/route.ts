import findBook from "@/lib/findBook";
import { NextRequest, NextResponse } from "next/server";
import jsonBible from '@/bible/t_kjv.json';
import { Bible } from "@/types/Bible";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { HighlightColor } from "@prisma/client";
import { authOptions, handler } from "../../auth/[...nextauth]/route";
const bible = (jsonBible as Bible);
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tag) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const searchParams = req.nextUrl.searchParams;
    const passage = searchParams.get("passage");
    if (!passage) return NextResponse.json({ error: 'Invalid passage!'}, { status: 400 });

    const [b, ch, vrs] = passage.toString().match(/\w+|(?=\w+\.)\d/g) || [];
    const book = findBook(b);
    if (!book) return NextResponse.json({ error: 'Invalid book!' }, { status: 400 });
    if (!ch) return NextResponse.json({ error: 'Invalid chapter!' }, { status: 400 });   

    return await prisma.user.findFirst({ where: { tag: session.user.tag }, select: { highlights: true } }).then((data) => {
        const highlights = data?.highlights.filter((i) => {
            const [psgB, psgCH] = i.passage.match(/\w+|(?=\w+\.)\d/g) || [];
            return Number(psgB) == book.b && Number(psgCH) == Number(ch)
        });
        return NextResponse.json({ highlights });
    }).catch(() => NextResponse.json({ error: 'An error occurred.' }, { status: 500 }));
}
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tag) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const searchParams = req.nextUrl.searchParams;
    const passage = searchParams.get("passage"),
          color = searchParams.get("color");
    
    if (!color || Object.values(HighlightColor as any).indexOf(color.toUpperCase()) == -1) return NextResponse.json({ error: 'Invalid color!' }, { status: 400 });
    if (!passage) return NextResponse.json({ error: 'Invalid passage!'}, { status: 400 });
    
    const [b, ch, vrs] = passage.toString().match(/\w+|(?=\w+\.)\d/g) || [];
    const book = findBook(b);

    if (!book) return NextResponse.json({ error: 'Invalid book!' }, { status: 400 });
    let result = bible.bible.find((i) => i.field[1] == book.b && i.field[2] == Number(ch) && i.field[3] == Number(vrs));
    if (!result) return NextResponse.json({ error: 'Invalid passage!' });

    return prisma.user.findFirst({where: { tag: session.user.tag }, select: { highlights: true }}).then((i) => {
        let highlights = i?.highlights;
        const highlight = highlights?.find((h) => h.passage == passage);
        if (highlight) highlights?.splice(highlights?.indexOf(highlight), 1)
        highlights = [...(highlights || []) as any[], { color, passage }];
        return prisma.user.update({ where: { tag: session.user.tag }, data: { highlights }, select: { highlights: true } })
        .then(({ highlights }) => {
            return NextResponse.json({ highlights });
        });
    }).catch(() => NextResponse.json({ error: 'An error occurred.' }, { status: 500 })) 
}
export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.tag) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const searchParams = req.nextUrl.searchParams;
    const passage = searchParams.get("passage");
    
    if (!passage) return NextResponse.json({ error: 'Invalid passage!'}, { status: 400 });

    const [b, ch, vrs] = passage.toString().match(/\w+|(?=\w+\.)\d/g) || [];
    const book = findBook(b);

    if (!book) return NextResponse.json({ error: 'Invalid book!' }, { status: 400 });
    let result = bible.bible.find((i) => i.field[1] == book.b && i.field[2] == Number(ch) && i.field[3] == Number(vrs));
    if (!result) return NextResponse.json({ error: 'Invalid passage!' });

    return prisma.user.findFirst({where: { tag: session.user.tag }, select: { highlights: true }}).then((i) => {
        let highlights = i?.highlights;
        const highlight = highlights?.find((h) => h.passage == passage);
        if (highlight) highlights?.splice(highlights?.indexOf(highlight), 1)
        return prisma.user.update({ where: { tag: session.user.tag }, data: { highlights }, select: { highlights: true } })
        .then(({ highlights }) => {
            return NextResponse.json({ highlights });
        });
    }).catch(() => NextResponse.json({ error: 'An error occurred.' }, { status: 500 })) 
}