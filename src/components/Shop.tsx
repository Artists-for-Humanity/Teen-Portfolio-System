'use client';

import { Artwork } from "@/types";
import { Fragment, useState } from "react";
import Filters, { FiltersContext } from "./Filters";
import PolaroidArtwork from "./artwork-variants/PolaroidArtwork";
import { Filters as FilterType } from "@/types";
import { AnimatePresence } from "motion/react";

export default function Shop({ artworks }:{ artworks: Artwork[] }) {
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
      <div className="flex">
        <div className="w-full max-w-xs pr-6">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-3 gap-6">
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