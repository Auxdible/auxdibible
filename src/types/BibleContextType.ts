import { Book } from "@/types/Book";

export interface BibleContextType { 
    readonly book: Book; 
    readonly ch: number; 
};
