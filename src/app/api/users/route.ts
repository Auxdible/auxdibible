import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    if (!search) return NextResponse.json({ error: 'Invalid search!' }, { status: 400 });
    return prisma.user.findMany({ where: { 
        OR: [
            { 
                tag: { contains: search }
            }, 
            {
                name: { contains: search }
            }
        ] }, select: { name: true, image: true, tag: true, id: true, highlights: true } })
        .then((users) => NextResponse.json({ users }))
        .catch((x) => console.log(x));
}