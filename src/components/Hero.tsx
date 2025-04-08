'use client';
import { AnimatePresence, motion } from "motion/react";
import Carousel from "./Carousel";
import { HeroArtwork, ArtworkPiece } from "./artwork-variants/HeroArtwork";
import { Fragment, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

export default function Hero({ artworks }:{ artworks: ArtworkPiece[] }) {
  const [index, setIndex] = useState(-1);
  const colors = ["bg-rose-400", "bg-emerald-400", "bg-indigo-400"];

  return (
    <motion.div>
      <Carousel>
        {artworks.map((artwork, i) => (
          <Fragment key={i}>
            <HeroArtwork
              title={artwork.title}
              artist={artwork.artist}
              price={artwork.price}
              color={colors[i % 3]}
              index={i}
              setIndex={setIndex}
            />
          </Fragment>
        ))}
      </Carousel>
      <AnimatePresence>
        {index !== -1 && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          key="overlay"
          className="bg-black opacity-20 fixed inset-0"
          onClick={() => setIndex(-1)}
          >
          </motion.div>
        )}

        {index !== -1 && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center pointer-events-none"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-screen max-w-6xl h-[75vh]">
              <motion.div
                layout
                layoutId={`${index}`}
                className={`${colors[index % 3]} rounded-xl aspect-video pointer-events-auto relative overflow-hidden`}
              >
                <motion.div layoutId={`text-${index}`} className="absolute bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black w-full p-8">
                <div className="w-full h-full flex flex-col justify-end">
                  <div className="flex w-full justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white block font-gotham uppercase">{artworks[index % 3].title}</span>
                      <span className="text-lg font-bold text-white block font-gotham uppercase">{artworks[index % 3].artist}</span>
                    </div>
                    <span className="text-3xl font-bold text-white block font-gotham uppercase">${artworks[index % 3].price}</span>
                  </div>
                  <motion.div className="text-white flex items-center">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facere perspiciatis dignissimos itaque obcaecati cum adipisci, ab nam quia quidem et quae numquam omnis odit magni praesentium, nesciunt autem expedita?
                    </div>
                    <div className="shrink-0">
                      <motion.button className="" onClick={() => setIndex(-1)}>
                        <span className="sr-only"></span>
                        <FaRegHeart className="size-6 hover:text-rose-400" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}