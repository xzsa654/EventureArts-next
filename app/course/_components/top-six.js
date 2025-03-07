'use client'

import React from 'react'
import ParaTitle from './para-title'

const rankData = [
    {
        num: "1",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
    {
        num: "2",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
    {
        num: "3",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
    {
        num: "4",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
    {
        num: "5",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
    {
        num: "6",
        img: "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1",
        pname: "烘焙餡料研究室｜15款甜點 + 22種餡料｜呂升達老師",
        pprice: "$ 1,800 NTD",
        href: "#",
    },
]

const RankList = () => {
    return (
        <div className="div">
            <div className="para">
                <ParaTitle title="熱門課程｜Best-Selling Courses" link="/course/explore" btn="" />
            </div>

            <div className="RankArea flex flex-wrap gap-8 justify-around">
                {rankData.map((rank, index) => (
                    // 單個排名卡
                    <div key={index} className="w-[500px]">
                        <a  href={rank.href} className="w-1/2">
                            <div className="flex flex-row">
                                {/* 左邊- 排名 */}
                                <div className="rank w-12 text-center">{rank.num}</div>
                                {/* 中間- 圖片 */}
                                <div className='content-center px-8'>
                                    <img  className="transition hover:scale-125 ease-in-out" src="https://fakeimg.pl/300x150/" alt="" />
                                </div>
                                {/* 右邊- 文字組 */}
                                <div className="content-center">
                                    <div className="pname2 pb-4">{rank.pname}</div> 
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