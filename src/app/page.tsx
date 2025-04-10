// import { ArtworkPiece } from "@/components/artwork-variants/HeroArtwork";
import Hero from "@/components/Hero";
import PolaroidArtwork from "@/components/artwork-variants/PolaroidArtwork";
// import Image from "next/image";
import { Fragment } from "react";
import FormCTAArtwork from "@/components/artwork-variants/FormCTAArtwork";
import ArtistUploadForm from "@/components/ArtistUploadForm";
import { Artwork, Studio } from "@/types";
import Airtable from "airtable";

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

  console.log(artworks);

  return (
    <div className="">
      <main className="w-screen overflow-x-hidden overscroll-none">
        <div className="w-screen px-5 lg:px-10 py-14">
          <div id="hero" className="mb-10 flex flex-col items-center text-center">
            <div className="flex items-center flex-col gap-3 text-[#F26631] justify-center">
              {/* <Image src="/flower2.svg" alt="" width={72} height={72} className="m" /> */}
              <span className="uppercase underline underline-offset-4">Artists for Humanity</span>
              <span className="block font-bold font-gotham text-7xl uppercase leading-none">
                Teen Portfolios
              </span>
            </div>
            <div className="uppercase font-gotham text-xl">Creative Jobs for Creative Teens</div>
            <a href="#explore-section" className="py-2 px-4 bg-[#F26631] rounded-full text-white font-bold font-gotham uppercase text-sm mt-6" >
            Explore
            <span>

            </span>
            </a>
            {/* <div className="flex gap-3">
              <div className="py-2 px-7 border rounded-full">
                <input type="text" name="searchbar" id="" placeholder="Search for a piece..." />
              </div>
            </div> */}
          </div>
          <div className="w-full flex justify-center">
            <div className="overflow-hidden rounded-lg">
              <Hero artworks={artworks} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-screen min-h-screen border-t p-10">
            <div id="explore-section" className="text-4xl font-bold uppercase font-gotham text-[#F26631]">Explore</div>
            <div className="flex">
              <div className="w-screen max-w-xs">
                <div className="text-2xl font-bold">Filters</div>

              </div>
              <div className="w-full">
                <div className="grid grid-cols-3 gap-6">
                  {artworks.slice(0, 3).map((art, i) => (
                    <Fragment key={i}>
                      <PolaroidArtwork {...art} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen min-h-screen p-10">
          <div className="flex justify-center items-center gap-10 p-20">
            {/* Left Column */}
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">
          Want to showcase your art on our homepage? Upload here!
              </h2>
              <div className="max-h-[75vh]">
                <FormCTAArtwork {...artworks[0]} />
              </div>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold mb-6 uppercase text-[#F26631]">Artists Form Submission</h2>
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
