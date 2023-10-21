import Image from 'next/image'
import Link from 'next/link';
import { BsCode, BsGear, BsGithub, BsLink, BsPhone } from 'react-icons/bs';
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
            <div className={"flex flex-col gap-4"}>
            <BsCode className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Lightweight</h1>
              <p>Minim tempor sit tempor ex incididunt veniam labore laboris veniam. Minim adipisicing minim ut elit eu irure. Sunt enim nulla sint nulla culpa dolore nulla et proident veniam reprehenderit ea. Laborum fugiat elit pariatur non ex consequat nostrud. Minim sunt ex reprehenderit nisi exercitation excepteur id minim amet aliqua proident. Labore velit veniam aliquip sint nisi adipisicing culpa anim adipisicing deserunt. Officia elit nisi adipisicing proident.</p>
            </div>
            <div className={"md:border-r-2 md:h-48 max-md:border-b-2 dark:border-white border-black max-md:w-full"}></div>
            <div className={"flex flex-col gap-4"}>
            <BsGear className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Utility</h1>
              <p>Minim tempor sit tempor ex incididunt veniam labore laboris veniam. Minim adipisicing minim ut elit eu irure. Sunt enim nulla sint nulla culpa dolore nulla et proident veniam reprehenderit ea. Laborum fugiat elit pariatur non ex consequat nostrud. Minim sunt ex reprehenderit nisi exercitation excepteur id minim amet aliqua proident. Labore velit veniam aliquip sint nisi adipisicing culpa anim adipisicing deserunt. Officia elit nisi adipisicing proident.</p>
            </div>
            <div className={"md:border-r-2 md:h-48 max-md:border-b-2 dark:border-white border-black max-md:w-full"}></div> 
            <div className={"flex flex-col gap-4"}>
              <BsPhone className={"mx-auto text-5xl"}/>
              <h1 className={"font-playfair-display text-5xl"}>Mobile-friendly</h1>
              <p>Minim tempor sit tempor ex incididunt veniam labore laboris veniam. Minim adipisicing minim ut elit eu irure. Sunt enim nulla sint nulla culpa dolore nulla et proident veniam reprehenderit ea. Laborum fugiat elit pariatur non ex consequat nostrud. Minim sunt ex reprehenderit nisi exercitation excepteur id minim amet aliqua proident. Labore velit veniam aliquip sint nisi adipisicing culpa anim adipisicing deserunt. Officia elit nisi adipisicing proident.</p>
            </div>
        </div>
      </section>
      <footer className={"items-row justify-between font-montserrat text-lg bg-neutral-400 dark:bg-neutral-700 p-2"}>
        <span className={"items-row gap-2"}>Built with <Image src={"/next.svg"} width={64} height={64} alt={"Next.js icon"} /></span>
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
