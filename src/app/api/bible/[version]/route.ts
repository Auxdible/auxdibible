import books from '@/bible/key_english.json';
import abbreviations from '@/bible/key_abbreviations_english.json';
import { NextRequest, NextResponse } from 'next/server';

const versions = ['kjv', 'bbe'];
interface Bible {
    readonly bible: { field: (number | string)[] }[]
}
export async function GET(req: NextRequest, { params }: { params: { version: string } }) {
    const { version } = params;
    if (versions.indexOf(version.toLowerCase()) == -1) 
        return NextResponse.json({ error: 'Invalid version!' }, { status: 400 });
    const {bible}: Bible = await import(`@/bible/t_${version.toLowerCase()}.json`);
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    if (!search) return NextResponse.json({ error: 'You need to specify a search parameter!' }, { status: 400 });
    const [b, ch, vrs] = search.toString().match(/\w+|(?=\w+\.)\d+/g) || [];
    const book = books.books.find((i) => i.b == Number(b)) || books.books.find((i) => i.n.toUpperCase() == b?.toUpperCase()) || abbreviations.find((i) => i.a.toUpperCase() == b?.toUpperCase());
    if (!book) return NextResponse.json({ error: 'Invalid book!' }, { status: 400 });
    let result = bible.filter((i) => i.field[1] == book.b && i.field[2] == ch);
    if (vrs) result = bible.filter((i) => i.field[1] == book.b && i.field[2] == ch && i.field[3] == vrs);
    return NextResponse.json({ data: { chapter: result }});
}