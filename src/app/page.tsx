import Hero from "@/components/Hero";
import FormCTAArtwork from "@/components/artwork-variants/FormCTAArtwork";
import ArtistUploadForm from "@/components/ArtistUploadForm";
import { Artwork, Studio } from "@/types";
import Airtable from "airtable";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Shop from "@/components/Shop";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export default async function Home() {
  async function fetchArtworks() {
    const records = await base("Artwork")
      .select({
        filterByFormula: "approved = TRUE()", // Filter by approval
      })
      .all();

    return records.map((record) => ({
      title: record.get("title") as string,
      artist: record.get("artist") as string,
      email: record.get("email") as string,
      year: record.get("year") as 'freshman' | 'sophomore' | 'junior' | 'senior',
      file: record.get("file") as string,
      studio: record.get("studio") as Studio,
      price: Number(record.get("price")) || undefined,
    }));
  }

  const artworks: Artwork[] = await fetchArtworks();

  return (
    <div className="h-screen min-h-screen">
      <main className="w-screen overflow-x-hidden overscroll-none">
        <div className="w-screen px-5 lg:px-10 py-14">
          <div id="hero" className="mb-10 flex flex-col items-center text-center">
            <div className="flex items-center flex-col gap-3 text-afh-primary justify-center">
              <Image src="/afh-wordmark.png" alt="Artists for Humanity" width={2084} height={1043} className="h-[10vh] w-auto" />
              <span className="block font-bold font-gotham text-5xl md:text-7xl uppercase leading-none">
                Teen Portfolios
              </span>
            </div>
            <a href="#explore" className="text-afh-primary flex flex-col items-center justify-center gap-2">
              <span className="font-bold uppercase text-lg mt-6 flex flex-col items-center">Explore</span>
              <ArrowDown className="ml-2 size-5 animate-bounce" />
            </a>
          </div>
          <div className="w-full flex justify-center">
            <div className="overflow-hidden rounded-lg">
              <Hero artworks={artworks} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-screen min-h-screen border-t p-10">
            <div id="explore" className="text-4xl font-bold uppercase font-gotham text-afh-primary">Explore</div>
            <Shop artworks={artworks} />
          </div>
        </div>
        <div className="w-screen min-h-screen p-10">
          <div className="flex md:flex-row flex-col justify-center items-center gap-10 md:p-20">
            {/* Left Column */}
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">
          Want to showcase your art on our homepage? Upload here!
              </h2>
              <div className="max-h-[75vh]">
                <FormCTAArtwork {...artworks[0]} />
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-stone-50/40 p-4 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold mb-6 uppercase text-afh-primary">Artists Form Submission</h2>
              <ArtistUploadForm />
            </div>
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
