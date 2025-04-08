import { ArtworkPiece } from "./HeroArtwork";

export default function PolaroidArtwork({ title, artist, price }: ArtworkPiece) {
  return (
    <div className="bg-white rounded p-4 transition border hover:shadow-lg shadow-[#F26631]/30">
      <div className="bg-zinc-400 aspect-square mb-3"></div>
      <div className="flex justify-between items-start pb-3 mb-3 border-b">
        <div>
          <div className="font-gotham font-bold text-xl">{title}</div>
          <div className="text-lg italic">{artist}</div>
        </div>
      </div>
      <div className="text-xl font-bold shrink-0">${price}</div>
    </div>
  )
}