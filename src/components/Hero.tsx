'use client';
import { AnimatePresence, motion } from "motion/react";
import Marquee from "./Marquee";
import { HeroArtwork } from "./artwork-variants/HeroArtwork";
import { useState } from "react";

export default function Hero() {
  const [index, setIndex] = useState(-1);
  const colors = ["bg-rose-400", "bg-emerald-400", "bg-indigo-400"];

  return (
    <>
      <Marquee gapBetween={4} speed={20}>
        <div className="flex gap-4">
          <HeroArtwork title={"Moona Leesa"} artist={"Jonathan Tejeda"} price={149} color={colors[0]} index={0} />
          <HeroArtwork title={"The Star Filled Night"} artist={"Mikey Guadarrama"} price={199} color={colors[1]} index={1} />
          <HeroArtwork title={"Girl With Shiny Earring"} artist={"Tamara Yampolsky"} price={128} color={"bg-indigo-400"} index={2} />
        </div>
      </Marquee>
      <AnimatePresence>
        {index !== -1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="overlay"
            onClick={() => setIndex(-1)}
          >

          </motion.div>
        )}

        {index !== -1 && (
          <SingleImage
            key="image"
            // index={index}
            color={colors[index]}
            // setIndex={setIndex}
            onClick={() => setIndex(-1)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function SingleImage({ color, onClick }:{ color: string, onClick: () => void }) {
  return (
    <div className="single-image-container" onClick={onClick}>
      <motion.div
        layoutId={color}
        className="single-image"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}