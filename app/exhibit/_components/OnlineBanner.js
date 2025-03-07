'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// import DecryptedText from "./DecryptedText"
// import GridDistortion from "./GridDistortion"

const DecryptedText = dynamic(() => import('./DecryptedText'), { ssr: false })
const GridDistortion = dynamic(() => import('./GridDistortion'), { ssr: false })

const OnlineBanner = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, position: 'relative', minHeight: '600px' }}
    >
      {' '}
      {/* Grid Distortion Background - Exactly as provided in the usage example */}
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <GridDistortion
          imageSrc="https://picsum.photos/1920/1080?grayscale"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="custom-class"
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
      {/* Content Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight font-en"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DecryptedText
              text="Too busy to visit exhibition?"
              speed={50}
              maxIterations={15}
              sequential={true}
              revealDirection="center"
              characters="!@#$%^&*()_+"
              className="text-white"
              encryptedClassName="text-purple-400"
              animateOn="view"
            />
          </motion.h2>

          <motion.h3
            className="text-xl md:text-2xl lg:text-3xl font-normal text-purple-200/90 mb-12 leading-relaxed font-en"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DecryptedText
              text="Let's try online exhibition!"
              speed={30}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              characters="ABCD1234!?"
              className="text-purple-200/90"
              encryptedClassName="text-purple-400/60"
              animateOn="view"
            />
          </motion.h3>

          {/* Button */}
          <Link href="/exhibit/online">
            <motion.button
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 font-normal 
                     py-4 px-10 rounded-full text-lg tracking-wide hover:bg-white/20 
                     transition-colors duration-300 group font"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <DecryptedText
                text="Explore Now"
                speed={30}
                maxIterations={10}
                sequential={true}
                revealDirection="center"
                characters="→★☆✦✧"
                className="text-white"
                encryptedClassName="text-purple-400"
                animateOn="hover"
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OnlineBanner
