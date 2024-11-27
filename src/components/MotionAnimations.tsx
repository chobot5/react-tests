import { motion, useAnimationFrame, useScroll } from 'framer-motion'
import { RefObject, useRef } from 'react'

export const MotionAnimations = () => {
  const { scrollY, scrollX, scrollXProgress, scrollYProgress } = useScroll()
  const ref: RefObject<HTMLDivElement> = useRef(null)

  return (
    <div>
      <motion.div className='box' style={{ scale: scrollYProgress }} />
      <motion.div
        className='box'
        initial={{ x: 0 }}
        animate={{ x: 100, backgroundColor: '#000' }}
        transition={{ type: 'tween', duration: 3 }}
        whileHover={{ scale: 1.2 }}
      />
      <motion.div
        className='square'
        initial={{ x: 0 }}
        animate={{ rotate: 180 }}
        transition={{ type: 'spring', velocity: 2 }}
      />
    </div>
  )
}
