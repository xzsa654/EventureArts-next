import ExhibitionSection from "./_components/ExhibitionSection"
import Image from "next/image"
import ExCard from "@/app/exhibit/_components/Excard"
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import "./exhibit.css"

export default function ExhibitPage() {
  return (
    <main className="min-h-screen">

      {/* Exhibition Section */}
      <ExhibitionSection />
      
      {/* First Hero Section */}
      <section className="relative h-[180px] w-full bg-[rgba(33,72,66,1)] flex items-center justify-between px-20">
        <h1 className="text-xl md:text-xl text-white">Too busy to visit an exhibition?</h1>
        <button className="text-xl font-bold bg-white px-6 py-4 text-black hover:bg-opacity-90">Try online Exhibition</button>
      </section>

      {/* Second Hero Section */}
      <section className="relative h-[680px] w-full overflow-hidden">
        <Image
          src="/chu-images/img-bg.jpg"
          alt="Art gallery interior"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">EventureArts Online Exhibition</h2>
          <p className="text-xl mb-8">CREATED BY EVENTUREARTS</p>
          <button className="border-2 border-white px-8 py-3 text-lg hover:bg-white hover:text-black transition-colors">
            Explore Now
          </button>
          <div className="absolute bottom-8 flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Online Exhibition Section */}
      <section className="mb-20 p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">What's Online...</h1>
          <a href="#" className="text-xl font-bold flex items-center gap-2 hover:opacity-70">
            See All Online Exhibition
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="flex gap-6 justify-center">
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 1" />
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 2" />
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 3" />
          </div>

          <button className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Make Your Own Exhibition Section */}
      <section className="border-t border-b border-black py-8 mb-20 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Make Your Own Exhibition</h2>
          <button className="text-xl font-bold px-6 py-2 bg-white border border-black hover:bg-black hover:text-white transition-colors">
            Create Now →
          </button>
        </div>
      </section>

      {/* Artist Section */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
          <a href="#" className="text-xl font-bold flex items-center gap-2 hover:opacity-70">
            See MORE
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Vinyl record player" fill className="object-cover" />
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Neon ART sign" fill className="object-cover" />
            </div>
            <div className="aspect-[4/3] relative">
              <Image src="/chu-images/img_9.jpg" alt="Album covers collection" fill className="object-cover" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button className="p-2 border border-black">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button className="p-2 border border-black">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

