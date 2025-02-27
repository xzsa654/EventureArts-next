'use client'

import React from 'react'

export default function CardB1() {

  // 供event頁面使用

  const brands = [
    {
      blogo: "https://i.pinimg.com/736x/22/43/57/224357b86d5a65947d00db2388299fdb.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/f4/65/30/f4653008b576255456f94886aa91c39b.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/cb/32/e1/cb32e1f7887bb4f328ca2e54213e8994.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/af/43/04/af43048b0821563ea57a617d75b25f04.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/80/d8/d0/80d8d0b568a9fe5600fc60c13f4578b0.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/74/60/57/74605710c53bcbdab7c0a9bdadd8f7c1.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/35/9e/f3/359ef37183095fe7dc30a27301f01f4a.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/ae/fc/c8/aefcc881320ba0a2a24a6d4a16e2fcce.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/e4/61/55/e4615551374fd976f96ff85b93622508.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/7c/fb/6b/7cfb6b62c2b5ae0bb5b38e1f574ab695.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/c7/f3/28/c7f328137b366f1f1636e96898b0e9c4.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/c5/50/44/c550440f4bf391e2804bc39dada6e506.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/27/03/84/2703840652c3d8480fd0ac5c0a111d50.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/e1/81/9d/e1819d65496154a88c958ac597d900e4.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/d6/c9/01/d6c901aceea023770800c7f7c586c2f8.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/a9/e7/e3/a9e7e3c0ab6490d0c2e27080e1f85639.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/11/bf/ac/11bfacccdeff70ffa06b985a83e41bc6.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },
    {
      blogo: "https://i.pinimg.com/736x/a4/1b/a2/a41ba29b61d77d6920ad28e6506dfccc.jpg",
      bname: "Art Gallery",
      binfo: "提供當代藝術作品展示與互動展覽，探索藝術的無限可能性。"
    },

  ];

  return (
    <div className="bcardArea grid grid-cols-6 gap-[2rem] place-items-center">
  {brands.map((brand, index) => (
    <a href="#" key={index} className="relative group">
      <div className="outside h-[200px] w-[200px] relative overflow-hidden">
        {/* LOGO */}
        <img className="blogo w-[200px] h-[200px] object-cover" src={brand.blogo} alt="" />
        
        {/* 黑色透明背景 */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4" >
          <p className='text-white'>{brand.bname}</p>
          <br />
          <p className='text-white'>{brand.binfo}</p>
        </div>
      </div>
    </a>
  ))}
</div>
  )
}
