import { Artwork } from "@/types";

export default function PolaroidArtwork({ title, artist, price, file }: Artwork) {
  return (
    <div className="bg-white rounded p-4 transition border hover:shadow-lg shadow-[#F26631]/30">
      <div className="aspect-square mb-3" style={{
        backgroundImage: `url(${file})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F26631',
      }}></div>
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