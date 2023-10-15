import { Book } from "./Book";

export interface BibleResponse {
    readonly book: Book;
    readonly chapter: number;
    readonly verse: number;
    readonly content: string;
}