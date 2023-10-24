import Image from 'next/image'
import Link from 'next/link';
import { BsCode, BsGear, BsGithub, BsLink, BsPhone } from 'react-icons/bs';
import { SiNextdotjs } from 'react-icons/si';
export default function Home() {
  return (
    <main>
      <header className={"flex flex-col gap-2 min-h-screen justify-center"}>
        <div className={"flex flex-col items-center w-fit mx-auto text-center"}>
          <h1 className={"font-playfair-display text-6xl md:items-row max-md:flex-col flex"}>
            <Image src={'/icon192.png'} width={82} height={82} alt={"Auxdibible logo"} className={"max-md:mx-auto"}/>
            Auxdibible
            </h1>
          <p className={"font-montserrat text-2xl"}>The all-in-one bible app by Auxdible.</p>
        </div>
      </header>
      <section className={"pb-2 flex flex-row items-center bg-gradient-to-b dark:from-neutral-800 from-neutral-300 dark:to-neutral-700 to-neutral-400 min-h-screen"}>
        <div className={"w-full items-center flex flex-row gap-5 max-md:flex-col text-center font-montserrat text-lg"}>
            <div className={"flex flex-col gap-4 flex-1"}>
            <BsCode className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Lightweight</h1>
              <p>Auxdibible is simple and lightweight. Auxdibible&apos;s sleek, modern UI is easy to learn and use! Auxdibible also contains a dark and light theme, allowing users to adjust the website&apos;s appearance to their liking!</p>
            </div>
            <div className={"md:border-r-2 md:h-48 max-md:border-b-2 dark:border-white border-black max-md:w-full"}></div>
            <div className={"flex flex-col gap-4 flex-1"}>
            <BsGear className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Utility</h1>
              <p>Auxdibible features a highlighting system for keeping track of your favorite verses! Auxdibible also features an account system, allowing users to sign in with Google and save their highlights between devices!</p>
            </div>
            <div className={"md:border-r-2 md:h-48 max-md:border-b-2 dark:border-white border-black max-md:w-full"}></div> 
            <div className={"flex flex-col gap-4 flex-1"}>
              <BsPhone className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Mobile-friendly</h1>
              <p>Auxdibible is mobile-friendly, featuring an easy-to-use interface for reading your Bible! Highlighted verses, users, and more can be viewed on both mobile and desktop!</p>
            </div>
        </div>
      </section>
      <footer className={"items-row justify-between font-montserrat text-lg bg-neutral-400 dark:bg-neutral-700 p-2"}>
        <span className={"items-row gap-2"}>Built with <SiNextdotjs/> Next.js</span>
        <span className={"items-row text-2xl gap-4"}>
          <Link href={"https://github.com/Auxdible"} className={"before:underline-custom relative hover:before:scale-100 before:translate-y-0.5"}>
            <BsGithub/>
          </Link>
          <Link href={"https://auxdible.me"} className={"before:underline-custom relative hover:before:scale-100 before:translate-y-0.5"}>
            <BsLink/>
          </Link>
        </span>
      </footer>
    </main>
  )
}
