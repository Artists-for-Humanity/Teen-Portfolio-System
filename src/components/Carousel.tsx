'use client';
import { useState, useRef, useEffect, Children } from 'react'
import { motion } from 'motion/react'
import { useWindowSize } from '@react-hook/window-size'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
const Carousel = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[],
}) => {
  const carouselRef = useRef<null | HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width] = useWindowSize()
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      const firstChild = carouselRef.current.firstElementChild as HTMLElement
      setItemWidth(firstChild.clientWidth)
    }
  }, [width, children])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : Children.count(children) - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < Children.count(children) - 1 ? prevIndex + 1 : 0
    )
  }

  return (
    <div className="relative w-fit flex justify-start">
      <div className="overflow-hidden w-[calc(100vw_-_40px)] lg:w-[70vw] aspect-video rounded-xl">
        <motion.div
          ref={carouselRef}
          className="flex transition-transform"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {children}
        </motion.div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-6 top-10 md:top-1/2 -translate-y-1/2 bg-stone-800/30 rounded-md text-white p-2"
      >
        <span className="sr-only">Previous artwork</span>
        <FaArrowLeft className="size-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-10 md:top-1/2 -translate-y-1/2 bg-stone-800/30 rounded-md text-white p-2"
      >
        <span className="sr-only">Next artwork</span>
        <FaArrowRight className="size-6" />
      </button>
    </div>
  )
}

export default Carousel