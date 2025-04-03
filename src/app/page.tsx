import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="w-screen overflow-x-hidden">
        <div className="h-screen w-screen px-10 pt-14">
          <div id="hero" className="mb-10 flex flex-col items-center text-center">
            <div className="flex items-center flex-col gap-3 text-[#F26631] justify-center">
              {/* <Image src="/flower2.svg" alt="" width={72} height={72} className="m" /> */}
              <span className="border rounded-full py-2 px-7 uppercase text-sm mb-2">Artists for Humanity</span>
              <span className="block font-bold font-gotham text-7xl uppercase leading-none">
                Teen Portfolios
              </span>
            </div>
            <div className="uppercase font-gotham text-xl">Creative Jobs for Creative Teens</div>
            <div className="uppercase font-gotham text-sm max-w-3xl mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga optio neque, laudantium nam vero aperiam itaque sint iste dolorum alias vel, modi natus, necessitatibus ducimus?</div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Hero />
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
