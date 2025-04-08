'use client';
import { motion } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa6';

interface ArtworkProps {
  title: string;
  artist: string;
  price: number;
  color: string;
  index: number;
  setIndex: (n: number) => void;
  // imageUrl?: string;
}

export interface ArtworkPiece {
  title: string;
  artist: string;
  price: number;
  imageUrl?: string;
  hero?: boolean;
  description?: string;
}

export function HeroArtwork({ title, artist, price, color, index, setIndex } : ArtworkProps) {
  return (
    <motion.div layout layoutId={`${index}`} className={`${color}  w-[calc(100vw_-_40px)] lg:w-[70vw] aspect-video shrink-0 rounded relative overflow-hidden group`}>
      <motion.div layoutId={`text-${index}`} className="absolute bottom-0 h-2/3 md:h-1/2 bg-gradient-to-b from-transparent to-black w-full p-8 rounded-b">
        <div className="w-full h-full md:flex items-end justify-between">
          <div>
            <span className="text-xl md:text-2xl font-bold text-white block font-gotham uppercase">{title}</span>
            <span className="text-base md:text-lg font-bold text-white block font-gotham uppercase">{artist}</span>
          </div>
          <span className="text-xl md:text-3xl font-bold text-white block font-gotham uppercase">${price}</span>
        </div>
      </motion.div>
      <motion.button className="bg-white py-2 px-3 absolute top-8 right-8 group-hover:opacity-100 opacity-0 transition rounded-md text-[#F26631] font-gotham uppercase font-bold cursor-pointer" onClick={() => setIndex(index)}>
        <span className="">View In Full</span>
        <FaArrowRight className="size-6 -rotate-45 inline ml-3" />
      </motion.button>
    </motion.div>
  )
}