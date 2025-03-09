'use client'

import React from 'react'
import ParaTitle from './para-title'

const rankData = [
    {
        num: "1",
        img: "/Blair/banner-41.jpg",
        pname: "侘寂陶藝茶具製作：Wabi-Sabi Ceramic Tea Set藝術陶藝",
        pprice: "$ 1610 NTD",
        href: "http://localhost:3000/course/product/41",
    },
    {
        num: "2",
        img: "/Blair/banner-31.jpg",
        pname: "浮雕木刻版畫創作：Relief Printmaking手工雕刻",
        pprice: "$ 1550 NTD",
        href: "http://localhost:3000/course/product/31",
    },
    {
        num: "3",
        img: "/Blair/banner-142.jpg",
        pname: "手寫哲學: 歐式書法與手帳美學",
        pprice: "$ 3840 NTD",
        href: "http://localhost:3000/course/product/142",
    },
    {
        num: "4",
        img: "/Blair/banner-5.jpg",
        pname: "法式刺繡藝術: Embroidery Art精緻花卉與文字繡藝",
        pprice: "$ 250 NTD",
        href: "http://localhost:3000/course/product/5",
    },
    {
        num: "5",
        img: "/Blair/banner-75.jpg",
        pname: "復古銅雕浮雕藝術: Metal Embossing金屬工藝設計",
        pprice: "$ 1010 NTD",
        href: "http://localhost:3000/course/product/75",
    },
    {
        num: "6",
        img: "/Blair/banner-184.jpg",
        pname: "經典重現｜懷舊電影欣賞與討論會",
        pprice: "$ 1200 NTD",
        href: "http://localhost:3000/course/product/184",
    },
]

const RankList = () => {
    return (
        <div className="div">
            <div className="para">
                <ParaTitle title="熱門課程｜Best-Selling Courses" link="/course/explore" btn="" />
            </div>

            <div className="RankArea flex flex-wrap gap-8 justify-around">
                {rankData.map((rank) => (
                    // 確保 key 放在最外層的 div
                    <div key={rank.num} className="w-[500px]">
                        <a href={rank.href} className="">
                            <div className="flex flex-row">
                                {/* 左邊- 排名 */}
                                <div className="rank w-12 text-center">{rank.num}</div>
                                {/* 中間- 圖片 */}
                                <div className='content-center px-8 w-[200px]'>
                                    <img  className="transition hover:scale-125 ease-in-out w-[300px]" src={rank.img} alt="" />
                                </div>
                                {/* 右邊- 文字組 */}
                                <div className="content-center">
                                    <div className="pname2 pb-4 w-[250px]">{rank.pname}</div> 
                                    <div className="pprice">{rank.pprice}</div> 
                                </div> 
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function TopSix(props) {
  return <RankList />
}