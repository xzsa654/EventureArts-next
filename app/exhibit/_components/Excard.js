import Image from "next/image"

const ExCard = ({ imageSrc, alt = "Exhibition image" }) => {
  return (
    <div className="bg-white max-w-[400px] overflow-hidden relative p-10 border-[1.5px] border-black">
      <div className="flex items-center gap-2.5 m-2.5">
        <div className="w-2.5 h-2.5 bg-[#FF5500]"></div>
        <span className="text-sm text-gray-700">DaAn Dist.</span>
      </div>
      <div className="w-full aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="font-['Courier_New'] text-lg font-bold mb-3 text-black">2025 | Dec.12th -Dec.20th</div>
        <h2 className="text-base leading-normal text-[#533527] mb-2 font-medium">
          Root your designs in earthy visuals that reflect the spirit of
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">the這是會上下滑動的區域，藉由直線，相鄰...</p>
      </div>
    </div>
  )
}

export default ExCard

