import books from '@/bible/key_english.json';
import abbreviations from '@/bible/key_abbreviations_english.json';

export default function findBook(b?: string) {
    return books.books.find((i) => i.b == Number(b)) || books.books.find((i) => i.n.toUpperCase() == b?.toUpperCase()) || abbreviations.find((i) => i.a.toUpperCase() == b?.toUpperCase());
} 