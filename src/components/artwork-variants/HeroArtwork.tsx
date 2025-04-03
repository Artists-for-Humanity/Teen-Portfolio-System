'use client';
import { motion } from 'motion/react';

interface ArtworkProps {
  title: string;
  artist: string;
  price: number;
  color: string;
  index: number;
  // imageUrl?: string;
}

export function HeroArtwork({ title, artist, price, color, index } : ArtworkProps) {
  return (
    <motion.div layoutId={`art-${index}`} className={`${color} w-[50vw] aspect-video shrink-0 rounded-xl relative overflow-hidden group`}>
      <div className="absolute bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black w-full p-8">
        <div className="w-full h-full flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-white block font-gotham uppercase">{title}</span>
            <span className="text-lg font-bold text-white block font-gotham uppercase">{artist}</span>
          </div>
          <span className="text-3xl font-bold text-white block font-gotham uppercase">${price}</span>
        </div>
      </div>
      <motion.button className="bg-zinc-800 py-2 px-3 absolute top-8 right-  group-hover:opacity-100 opacity-0 transition rounded-md text-white font-gotham uppercase font-bold cursor-pointer">
        View Artwork
      </motion.button>
    </motion.div>
  )
}