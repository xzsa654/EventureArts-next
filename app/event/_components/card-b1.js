'use client'

import React from 'react'

export default function CardB1() {
  // 供event頁面使用

  const brands = [
    {
      href: '',
      blogo: '/Blair/brand-logo/partner-brand.png',
      bname: 'Partner Brand',
      binfo: '合作品牌',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo17.png',
      bname: 'OLIVIA 水晶能量工坊',
      binfo:
        '我們相信每一顆水晶都承載著獨特的能量，能夠與人的內在頻率共鳴，帶來正向改變。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo16.png',
      bname: 'Kinsley Floral Atelier',
      binfo: '台北最有質感的花坊',
    },
    {
      href: 'http://localhost:3000/brandsinfo/84',
      blogo: '/Blair/event/brand-logo15.png',
      bname: 'AURORA SCENT',
      binfo: '捕捉極光之息，喚醒靈魂之香。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/85',
      blogo: '/Blair/event/brand-logo14.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/86',
      blogo: '/Blair/event/brand-logo13.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo12.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo11.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo10.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo9.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo8.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo7.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo6.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo5.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo4.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo3.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo2.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
    {
      href: 'http://localhost:3000/brandsinfo/83',
      blogo: '/Blair/event/brand-logo1.png',
      bname: 'Art Gallery',
      binfo: '提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。',
    },
  ]

  return (
    <div className="bcardArea grid grid-cols-6 gap-[2rem] place-items-center">
      {brands.map((brand, index) => (
        <a href={brand.href} key={index} className="relative group">
          <div className="outside h-[200px] w-[200px] relative overflow-hidden">
            {/* LOGO */}
            <img
              className="blogo w-[200px] h-[200px] object-cover"
              src={brand.blogo}
              alt=""
            />

            {/* 黑色透明背景 */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
              <p className="text-white">{brand.bname}</p>
              <br />
              <p className="text-white">{brand.binfo}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
