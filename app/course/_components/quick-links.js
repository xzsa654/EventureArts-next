'use client'

import React from 'react'

const links = [
  {
    src: "Blair/links/r5.png",
    text: "花藝植栽",
    href: "https://google.com.tw",
  },
  {
    src: "Blair/links/r4.png",
    text: "縫紉布藝",
    href: "#",
  },
  {
    src: "Blair/links/r3.png",
    text: "身心靈",
    href: "#",
  },
  {
    src: "Blair/links/r6.png",
    text: "音樂舞蹈",
    href: "#",
  },
  {
    src: "Blair/links/r7.png",
    text: "食尚飲品",
    href: "#",
  },
  {
    src: "Blair/links/r2.png",
    text: "講座分享",
    href: "#",
  },
  {
    src: "Blair/links/r5.png",
    text: "戶外踏青",
    href: "#",
  },
  {
    src: "Blair/links/r6.png",
    text: "運動健身",
    href: "#",
  }
]

const LinkList = () => {
    return (
      <div className="LinkArea flex justify-between flex-wrap text-center">
        {links.map((link, index) => (
          <a key={index} href={link.href} className="imgbox w-[90px] h-[90px]">
            <div className="link flex justify-center items-center flex-col w-full h-full gap-2">
              <img src={link.src} className="w-[70%] h-[70%]" alt={`icon-${index}`} />
              {link.text}
            </div>
          </a>
        ))}
      </div>
    );
  };

export default function QuickLinks() {
  return <LinkList />;
}