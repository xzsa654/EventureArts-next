'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import Link from 'next/link'
import OnlineExhibitionCard from './OnlineExhibitionCard'

export default function LatestOnlineExhibitions({ onlineExhibitions }) {
  return (
    <section className="py-8 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-white">{"What's new?"}</h1>
          <Link href="/exhibit/online" className="group">
            <button className="text-xl px-6 py-4 text-white transition-all rounded-lg cursor-pointer group-hover:underline">
              <span className="transition-all group-hover:text-[1.6em] group-hover:font-bold">
                Explore More Online Exhibition →
              </span>
            </button>
          </Link>
        </div>

        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          style={{
            '--swiper-pagination-color': '#FFBA08',
          }}
          initialSlide={1} // 讓 Swiper 預設停在第二個分頁

        >
          {Array.isArray(onlineExhibitions) &&
            onlineExhibitions.map((exhibition) => (
              <SwiperSlide key={exhibition.e_id}>
                <OnlineExhibitionCard
                  e_id={exhibition.e_id}
                  tag={exhibition.e_optionNames}
                  cover_image={
                    exhibition.cover_image?.startsWith('http')
                      ? exhibition.cover_image
                      : exhibition.cover_image
                      ? `http://localhost:3001/uploads/chu-uploads/${exhibition.cover_image}`
                      : '/placeholder.svg'
                  }
                  date={`${exhibition.e_startdate} - ${exhibition.e_enddate}`}
                  title={exhibition.e_name}
                  description={exhibition.e_desc}
                  artist={exhibition.bd_name}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  )
}
