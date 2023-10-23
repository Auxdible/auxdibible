import books from '@/bible/key_english.json';
import { NextRequest, NextResponse } from 'next/server';
import findBook from '@/lib/findBook';
import { Bible } from '@/types/Bible';

const versions = ['kjv', 'bbe'];
export async function GET(req: NextRequest, { params }: { params: { version: string } }) {
    const { version } = params;
    if (versions.indexOf(version.toLowerCase()) == -1) 
        return NextResponse.json({ error: 'Invalid version!' }, { status: 400 });
    const {bible}: Bible = await import(`@/bible/t_${version.toLowerCase()}.json`);
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    if (!search) return NextResponse.json({ error: 'You need to specify a search parameter!' }, { status: 400 });
    const [b, ch, vrs] = search.toString().match(/\w+|(?=\w+\.)\d/g) || [];
    const book = findBook(b);
    if (!book) return NextResponse.json({ error: 'Invalid book!' }, { status: 400 });
    let result = bible.filter((i) => i.field[1] == book.b && i.field[2] == Number(ch));
    if (vrs) result = bible.filter((i) => i.field[1] == book.b && i.field[2] == Number(ch) && i.field[3] == Number(vrs));
    return NextResponse.json({ data: result.map((i) => ({
        book: books.books.find((i) => i.b == book.b),
        chapter: i.field[2],
        verse: i.field[3],
        content: i.field[4]
    })) });
}