"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CandidSection() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Initial check for system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }

    // Set up interval to switch modes every 5 seconds
    const intervalId = setInterval(() => {
      setIsDarkMode((prevMode) => !prevMode)
    }, 5000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  const words1 = "Too busy to the exhibition?".split(" ")
  const words2 = "Let's Try EventureARTs Online Exhibition!".split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section className={`h-[580px] transition-colors duration-1000 ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="relative">
          {/* Top right image */}
          <motion.div
            className="absolute -top-4 right-0 w-[100px] h-[75px] md:w-[150px] md:h-[100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/chu-images/img_9.jpg"
              alt="Candid moment"
              width={150}
              height={100}
              className="rounded-full"
            />
          </motion.div>

          {/* Main heading with animation */}
          <motion.h1
            className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8 transition-colors duration-1000 ${isDarkMode ? "text-white" : "text-black"}`}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words1.map((word, index) => (
              <motion.span key={index} variants={child} className="inline-block mr-2">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Middle left image */}
          <motion.div
            className="relative left-0 my-4 w-[100px] h-[75px] md:w-[150px] md:h-[100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src="/chu-images/img_15.jpg"
              alt="Lifestyle shot"
              width={250}
              height={100}
              className="rounded-full"
            />
          </motion.div>

          {/* Subheading with animation */}
          <div className="ml-auto max-w-4xl">
            <motion.h2
              className={`text-5xl md:text-7xl font-bold leading-tight tracking-tight transition-colors duration-1000 ${isDarkMode ? "text-white" : "text-black"}`}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {words2.map((word, index) => (
                <motion.span key={index} variants={child} className="inline-block mr-2">
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Bottom right image */}
          <motion.div
            className="absolute bottom-0 right-0 w-[100px] h-[75px] md:w-[150px] md:h-[100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Image
              src="/chu-images/img_5.jpg"
              alt="Urban life"
              width={150}
              height={100}
              className="rounded-full"
            />
          </motion.div>

          {/* Mode indicator */}
          <div
            className={`mt-8 text-lg font-semibold transition-colors duration-1000 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Current Mode: {isDarkMode ? "Dark" : "Light"}
          </div>
        </div>
      </div>
    </section>
  )
}

