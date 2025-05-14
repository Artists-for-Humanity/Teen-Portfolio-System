'use client';
import { LayoutList, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { Artwork } from '@/types';
import { motion } from 'motion/react';

export default function PersonalArtworkView({ name, artworks }:{ name: string, artworks: Artwork[] }) {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{name}</h2>
        <div className="flex gap-4 p-2">
          <button
          className={`transition rounded-full p-2 ${isGridView ? 'bg-afh-primary text-white' : 'text-stone-800 bg-transparent'} ${isGridView ? 'font-bold' : ''}`}
          onClick={() => setIsGridView(true)}
          >
            <LayoutGrid className="size-6" />
          </button>
          <button
          className={`transition rounded-full p-2 ${!isGridView ? 'bg-afh-primary text-white' : 'text-stone-800 bg-transparent'} ${!isGridView ? 'font-bold' : ''}`}
          onClick={() => setIsGridView(false)}
          >
            <LayoutList className="size-6" />
          </button>
        </div>
      </div>
      <div className={isGridView ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2' : 'flex flex-col gap-4'}>
        {artworks.map((artwork, i) => (
          <div
            key={i}
            className={`relative group ${isGridView ? '' : 'flex items-center gap-4'}`}
          >
            <motion.img
              src={artwork.file as string}
              alt={artwork.title as string}
              className={`object-cover ${isGridView ? 'w-full h-auto aspect-square' : 'w-24 h-24'}`}
              layout
            />
            {!isGridView && (
              <div>
                <h3 className="text-lg font-semibold">{artwork.title as string}</h3>
                {/* <p className="text-sm text-gray-500">{artwork. as string}</p> */}
              </div>
            )}
            {isGridView && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg font-semibold">{artwork.title as string}</span>
              </div>
            )}
          </div>
        ))}
        {artworks.length === 0 && (
          <div className="w-full h-full flex items-center justify-center col-span-2 md:col-span-4 lg:col-span-5">
            <p className="text-lg text-stone-500">Hmm, nothing to see here!</p>
          </div>
        )}
      </div>
    </div>
  );
}