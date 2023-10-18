import {BibleSearch} from "@/components/BibleSearch";

export default function Bible() {
    return (<main>
        <section className={"flex flex-col items-center gap-4 my-5 text-center"}>
            <h1 className={"font-playfair-display text-5xl"}>Easy Bible reading on-the-go.</h1>
            <p className={"font-montserrat text-2xl"}>Read your bible at work, at home, or anywhere using Auxdibible!</p>
        </section>
        <section className={"w-fit mx-auto"}>
            <BibleSearch/>
        </section>
    </main>);
}