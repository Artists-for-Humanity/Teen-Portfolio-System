import { ArtworkPiece } from "@/components/artwork-variants/HeroArtwork";
import Hero from "@/components/Hero";
import PolaroidArtwork from "@/components/artwork-variants/PolaroidArtwork";
// import Image from "next/image";
import { Fragment } from "react";
import FormCTAArtwork from "@/components/artwork-variants/FormCTAArtwork";

export default function Home() {
  const artworks: ArtworkPiece[] = [
    {
      title: "Moona Leesa",
      artist: "Jonathan Tejeda",
      price: 149,
      hero: true,
    },
    {
      title: "The Star Filled Night",
      artist: "Mikey Guadarrama",
      price: 199,
      hero: true,
    },
    {
      title: "Girl With Shiny Earring",
      artist: "Tamara Yampolsky",
      price: 128,
      hero: true
    }
  ]

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
                <FormCTAArtwork {...artworks[artworks.length - 1]} />
              </div>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold mb-6 uppercase text-[#F26631]">Artists Form Submission</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year (in High School)
                  </label>
                  <select
                  id="year"
                  name="year"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  required
                  >
                  <option value="">Select your year</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="studio" className="block text-sm font-medium text-gray-700">
                    Studio
                  </label>
                  <select
                    id="studio"
                    name="studio"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                  >
                    <option value="graphic-design">Graphic Design</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                    Upload Your Artwork
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H20a4 4 0 00-4 4v28a4 4 0 004 4h8a4 4 0 004-4V12a4 4 0 00-4-4z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M32 16l-8 8-8-8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="fileUpload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 p-1"
                  >
                    <span>Upload a file</span>
                    <input
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      className="sr-only"
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#F26631] text-white font-bold rounded-md hover:bg-[#d4552b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F26631]"
                  >
                    Submit
                  </button>
                </div>
              </form>
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
