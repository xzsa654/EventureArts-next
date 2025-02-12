import Image from "next/image"
import Link from "next/link"

const Excard = ({ e_id, tag, image, date, title, description }) => {
  return (
    <Link href={`/exhibit/detail/${e_id}`} className="block">
      <div className="bg-white max-w-[400px] overflow-hidden relative p-8 border-[1.5px] border-black transition-all duration-300 hover:scale-105 hover:bg-[#D4A84B] hover:shadow-md">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-2.5 h-2.5 bg-[#FF5500]"></div>
          <span className="text-xs text-gray-700">{tag}</span>
        </div>
        <div className="w-full aspect-[4/3] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pt-4">
          <div className="font-['Courier_New'] text-sm font-bold mb-2 text-black">{date}</div>
          <h2 className="text-sm leading-snug text-[#533527] mb-1.5 font-medium">{title}</h2>
          <p className="text-xs leading-tight text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default Excard

