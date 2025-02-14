"use client"
import Image from "next/image"
import "../exhibit.css"

const exhibitionData = [
  // Column 1
  {
    id: "01",
    column: 1,
    image: "/chu-images/img_9.jpg",
    title: "Bryce Thompson for",
    subtitle: "Modeliste Magazine. Shot by Anisia Kuzmina.",
    date: "24.2.2024",
  },
  {
    id: "04",
    column: 1,
    image: "/chu-images/img_9.jpg",
    title: "Urban Stories",
    subtitle: "City Life Magazine",
    date: "20.2.2024",
  },
  // Column 2
  {
    id: "02",
    column: 2,
    image: "/chu-images/img_5.jpg",
    title: "Dennis Stenild for ELLE",
    subtitle: "Denmark with Hannah, Jasmine and Zoe. Artists & Nature.",
    date: "22.2.2024",
  },
  {
    id: "05",
    column: 2,
    image: "/chu-images/img_5.jpg",
    title: "Nature's Canvas",
    subtitle: "Environmental Portraits",
    date: "19.2.2024",
  },
  // Column 3
  {
    id: "03",
    column: 3,
    image: "/chu-images/img_17.jpg",
    title: "Darren Mcdonald for",
    subtitle: "Marie Claire Australia",
    date: "18.2.2024",
  },
  {
    id: "06",
    column: 3,
    image: "/chu-images/img_17.jpg",
    title: "Modern Light",
    subtitle: "Fashion Weekly",
    date: "15.2.2024",
  },
]

export default function ExhibitionSection({ onExhibitionSelect }) {
  // Group items by column
  const column1 = exhibitionData.filter((item) => item.column === 1)
  const column2 = exhibitionData.filter((item) => item.column === 2)
  const column3 = exhibitionData.filter((item) => item.column === 3)

  const handleExhibitionClick = (exhibition) => {
    onExhibitionSelect(exhibition)
    const secondHeroSection = document.getElementById("first-hero-section")
    if (secondHeroSection) {
      secondHeroSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const renderColumn = (items, animationDelay = "0s") => (
    <div className="carousel-column" style={{ animationDelay }}>
      {/* Original items */}
      {items.map((exhibition) => (
        <div key={exhibition.id} className="mb-16 space-y-4">
          <span className="block text-7xl font-light">{exhibition.id}</span>
          <div
            className="relative aspect-[3/4] cursor-pointer group overflow-hidden w-[300px]"
            onClick={() => handleExhibitionClick(exhibition)}
          >
            <Image
              src={exhibition.image || "/placeholder.svg"}
              alt={exhibition.title}
              fill
              sizes="(max-width: 768px) 150vw, (max-width: 1200px) 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font text-lg">{exhibition.title}</h3>
            <p className="text-sm leading-relaxed">{exhibition.subtitle}</p>
            <p className="text-sm text-gray-600">{exhibition.date}</p>
          </div>
        </div>
      ))}
      {/* Duplicated items for seamless loop */}
      {items.map((exhibition) => (
        <div key={`${exhibition.id}-duplicate`} className="mb-8 space-y-1">
          <span className="block text-7xl font-light">{exhibition.id}</span>
          <div
            className="relative aspect-[3/4] cursor-pointer group overflow-hidden w-[300px]"
            onClick={() => handleExhibitionClick(exhibition)}
          >
            <Image
              src={exhibition.image || "/placeholder.svg"}
              alt={exhibition.title}
              fill
              sizes="(max-width: 768px) 150vw, (max-width: 1200px) 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font text-lg">{exhibition.title}</h3>
            <p className="text-sm leading-relaxed">{exhibition.subtitle}</p>
            <p className="text-sm text-gray-600">{exhibition.date}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative h-[770px]">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image src="/chu-images/img-bg.jpg" alt="Background" fill className="object-cover" priority />
      </div>

      {/* this is Left text + carousel area  */}
      <section className="relative min-h-screen">
        <div className="flex justify-between px-5 w-full">
          {/* Left side title - rotated 90 degrees */}
          <div className="w-1/4 flex items-center h-screen">
            <h1 className="left-text text-2xl font transform -rotate-90 origin-left whitespace-nowrap ml-8">
              Current Exhibition
            </h1>
          </div>

          {/* Right side vertical carousels */}
          <div
            className="w-[70%] grid grid-cols-3 gap-1 overflow-hidden relative pr-0 ml-auto justify-items-end"
            style={{ height: "770px" }}
          >
            {/* Vertical lines */}
            <div className="vertical-line left-1/3"></div>
            <div className="vertical-line left-2/3"></div>

            {/* Each column has different animation delay for varied movement */}
            <div className="overflow-hidden">{renderColumn(column1, "0s")}</div>
            <div className="overflow-hidden">{renderColumn(column2, "-3s")}</div>
            <div className="overflow-hidden">{renderColumn(column3, "-6s")}</div>
          </div>
        </div>
      </section>
    </section>
  )
}

