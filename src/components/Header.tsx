import Image from "next/image"

export default function Header() {
  return (
    <div className="sticky top-0 bg-white z-50 w-screen py-8 text-base flex justify-between items-center px-10 border-b">
      <a href="https://afhboston.org" className="flex gap-4 group items-center"><Image src="/afh-icon.png" width={100} height={100} alt="Artists for Humanity" className="size-14" /> <span className="group-hover:opacity-100 opacity-0 group-hover:translate-x-0 -translate-x-6 text-black transition">Go to AFH Website</span></a>
      <div className="flex uppercase gap-4">
        <div>explore</div>
        <div>profile</div>
      </div>
    </div>
  )
}