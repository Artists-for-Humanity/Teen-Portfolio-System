'use client';
import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { useWindowSize } from '@react-hook/window-size'

const Marquee = ({
  children,
  gapBetween = 0,
  speed = 20,
}: {
  children: React.ReactNode | React.ReactNode[]
  gapBetween?: number
  speed?: number
}) => {
  const marquee = useRef<null | HTMLDivElement>(null)
  const [width] = useWindowSize()
  const [marqueeWidth, setMarqueeWidth] = useState(0)
  const [marqueeSpeed, setMarqueeSpeed] = useState(speed)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (global.window !== undefined) {
      setMarqueeWidth(marquee.current!.scrollWidth)
    }
  }, [width])

  const duplicateChildren = new Array(3).fill(children)

  return (
    <motion.div className="overflow-hidden">
      <motion.div

        ref={marquee}
        className="flex z-20 marquee"
      >
        {duplicateChildren.map((child, index) => (
          <div key={index} className="flex-shrink-0 px-2">
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Marquee