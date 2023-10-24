import { Highlight } from "@prisma/client";

export interface UserData {
    readonly name: string;
    readonly tag: string;
    readonly image: string;
    readonly highlights: Highlight[];
    readonly id: string;
}