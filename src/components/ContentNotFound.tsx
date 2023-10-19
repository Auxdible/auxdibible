import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowClockwise, BsExclamationCircle } from "react-icons/bs";

export function ContentNotFound() {
    const router = useRouter();
    return (<div className="flex flex-col gap-5 justify-center items-center max-w-xl mx-auto my-5 text-center">
        <BsExclamationCircle className={"text-7xl"}/>
        <h1 className={"text-6xl font-playfair-display"}>Oops!</h1>
        <p className={"text-3xl font-montserrat"}>Couldn&apos;t find that scripture. Possibly a chapter outside of the valid chapters?</p>
        <span onClick={() => router.back()} className={"text-3xl font-montserrat relative -z-10 before:underline-custom before:hover:scale-100 cursor-pointer items-row gap-2"}><BsArrowClockwise/> Go Back</span>
    </div>)
}