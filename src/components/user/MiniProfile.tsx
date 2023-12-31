import Image from "next/image";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";

export function MiniProfile({ imageURL, name, tag }: { imageURL?: string, name: string, tag: string }) {
    return (
    <span className={"items-row gap-2 p-1"}>
        {imageURL ? <Image
        src={imageURL}
        alt={"User profile icon"}
        width={48}
        height={48}
        className={"rounded-2xl"}
        /> : <BsPerson className={"text-3xl"}/>}
        <span className={"flex flex-col gap-0"}>
            <Link href={`/user/${tag}`} className={"text-xl max-md:text-base font-montserrat before:underline-custom before:hover:scale-100 relative"}>{name}</Link>
            <span className={"text-base max-md:text-xs font-inter h-fit dark:text-gray-400 text-gray-700"}>@{tag}</span>
        </span>
    </span>
    );
}