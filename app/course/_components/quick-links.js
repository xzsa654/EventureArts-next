'use client'

import React from 'react'
import Link from 'next/link'

const links = [
  {
    src: "Blair/links/plant2.png",
    text: "花藝植栽",
    href: "/course/explore?cate=1", // 內部頁面
  },
  {
    src: "Blair/links/r4.png",
    text: "縫紉布藝",
    href: "/course/explore?cate=2", // 內部頁面
  },
  {
    src: "Blair/links/crystal.png",
    text: "身心靈",
    href: "/course/explore?cate=3",
  },
  {
    src: "Blair/links/piano.png",
    text: "音樂舞蹈",
    href: "/course/explore?cate=4",
  },
  {
    src: "Blair/links/mokapot.png",
    text: "食尚飲品",
    href: "/course/explore?cate=5",
  },
  {
    src: "Blair/links/r2.png",
    text: "講座分享",
    href: "/course/explore?cate=6",
  },
  {
    src: "Blair/links/outdoor.png",
    text: "藝術繪畫",
    href: "/course/explore?cate=7",
  },
  {
    src: "Blair/links/r6.png",
    text: "運動健身",
    href: "/course/explore?cate=8",
  }
]

const LinkList = () => {
  return (
    <div className="LinkArea flex flex-wrap justify-evenly text-center my-4">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className="w-[100px] h-[100px] cursor-pointer"> {/* 這裡加了 cursor-pointer */}
            <div className="linkbox flex justify-end items-center flex-col w-full h-full gap-8">
              <img src={link.src} className="w-[70%] h-[70%]" alt={`icon-${index}`} />
              <p>{link.text}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default function QuickLinks() {
  return <LinkList />;
}