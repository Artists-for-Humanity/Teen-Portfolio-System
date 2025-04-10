'use client';
import { useState } from "react";
import { Artwork } from "@/types";

export default function FormCTAArtwork({ title, artist, price, file }: Artwork) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="rounded p-4 transition hover:shadow-lg shadow-[#F26631]/30">
      <div className="aspect-[3/4] h-[60vh] mb-3" style={{
        backgroundImage: `url(${file})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F26631',
      }}></div>
      <button
        className="w-full text-left"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <div className="flex justify-between items-start pb-3 mb-3 border-b">
          <div>
        <div className="font-gotham font-bold text-xl">{title}</div>
        <div className="text-lg italic">{artist}</div>
          </div>
          <div className="text-xl font-bold shrink-0">${price}</div>
        </div>
      </button>
      {showDetails && (
        <div className="mt-3">
          <p>Additional artwork details go here...</p>
        </div>
      )}
    </div>
  )
}