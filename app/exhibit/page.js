import Image from "next/image"
import ExCard from "@/components/common/ExCard"
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-6">
      {/* Online Exhibition Section */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">What's Online...</h1>
          <a href="#" className="flex items-center gap-2 hover:opacity-70">
            See All Online Exhibition
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="flex gap-6 justify-center">
            {/* Exhibition Cards */}
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 1" />
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 2" />
            <ExCard imageSrc="/chu-images/img_9.jpg" alt="Exhibition 3" />
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button className="absolute right-[-40px] top-1/2 transform -translate-y-1/2">
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Make Your Own Exhibition Section */}
      <section className="border-t border-b border-black py-8 mb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Make Your Own Exhibition</h2>
          <button className="px-6 py-2 bg-white border border-black hover:bg-black hover:text-white transition-colors">
            Create Now →
          </button>
        </div>
      </section>

      {/* Artist Section */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Artists</h2>
          <a href="#" className="flex items-center gap-2 hover:opacity-70">
            See MORE
            <ArrowLongRightIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            {/* Artist Images */}
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

          {/* Artist Navigation */}
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

