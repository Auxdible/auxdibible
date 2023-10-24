import { BsExclamationCircle } from "react-icons/bs";

export function UserNotFound() {
    return (<div className="flex flex-col gap-5 justify-center items-center max-w-xl mx-auto my-5 text-center">
        <BsExclamationCircle className={"text-7xl"}/>
        <h1 className={"text-6xl font-playfair-display"}>Oops!</h1>
        <p className={"text-3xl font-montserrat"}>Couldn&apos;t find that user. Try searching with a different tag.</p>
    </div>)
}