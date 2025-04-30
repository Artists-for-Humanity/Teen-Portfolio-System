'use client';
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <div className="fixed top-0 bg-white z-1 w-screen py-8 text-base flex justify-between items-center px-10 border-b">
      <Link href="https://afhboston.org" className="flex gap-4 group items-center">
        <Image src="/afh-icon.png" width={100} height={100} alt="Artists for Humanity" className="size-14" />
        <span className="group-hover:opacity-100 opacity-0 group-hover:translate-x-0 -translate-x-6 text-black transition">Go to AFH Website</span>
      </Link>
      <div className="flex gap-4 uppercase">
        <Link href="/"><motion.span layout className="no-underline hover:underline">explore</motion.span></Link>
        <Link href="/profile">profile</Link>
      </div>
    </div>
  )
}