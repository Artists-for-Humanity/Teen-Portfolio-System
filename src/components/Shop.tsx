'use client';

import { Artwork } from "@/types";
import { Fragment, useState } from "react";
import Filters, { FiltersContext } from "./Filters";
import PolaroidArtwork from "./artwork-variants/PolaroidArtwork";
import { Filters as FilterType } from "@/types";
import { AnimatePresence, motion } from "motion/react";

export default function Shop({ artworks }:{ artworks: Artwork[] }) {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    artist: "",
    title: "",
    studio: 'graphic-design',
    price: {
      min: 0,
      max: 1000,
    },
  });

  const filteredArtworks = artworks.filter((artwork) => {
    const artist = artwork.artist.toLowerCase().includes(filters.artist.toLowerCase());
    const title = artwork.title.toLowerCase().includes(filters.title.toLowerCase());
    const studio = artwork.studio === filters.studio;
    const price = artwork.price ? (artwork.price >= filters.price.min && artwork.price <= filters.price.max) : true;

    return artist && title && studio && price;
  });

  return (
    <FiltersContext.Provider value={filters}>
      <div className="flex md:flex-row flex-col">
          <div className="md:hidden block w-full max-w-xs md:pr-6 mb-3">
            <button
              className="bg-afh-primary text-white font-bold w-full p-2 rounded"
              onClick={() => setFilterModalIsOpen(true)}
            >Filter artwork</button>
            <AnimatePresence>
              {filterModalIsOpen && (
                <motion.div className="fixed inset-0 z-[60] flex justify-center items-end bg-black/25 backdrop-blur-sm">
                  <motion.div className="bg-white h-[60lvh] p-6">
                    <div className="flex flex-col h-[60svh]">
                      <Filters filters={filters} setFilters={setFilters} />
                      <hr className="my-4 opacity-25" />
                      <button onClick={() => setFilterModalIsOpen(false)} className="bg-afh-primary p-2 rounded w-full text-white font-bold">Save</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        <div className="md:block hidden w-full max-w-xs pr-6">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArtworks.slice(0, 20).map((art, i) => (
              <Fragment key={i}>
                <AnimatePresence>
                  <PolaroidArtwork {...art} />
                </AnimatePresence>
              </Fragment>
            ))}

            {filteredArtworks.length === 0 && (
              <div className="col-span-3 text-center">
                <h2 className="text-2xl font-bold mb-4">No artworks found</h2>
                <p className="text-gray-500">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </FiltersContext.Provider>
  );
}