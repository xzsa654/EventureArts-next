'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox } from '@heroui/react';
import BtnCTA from '../course/_components/btnCTA';

import './order.css';

export default function Order(props) {
  return (
    <>
    {/*---------- 上—— 商品明細 ----------*/}
    <div className="detail">
        <div className="orderTitle"><p>商品明細</p></div>
        <hr />
        {/* 1. 課程名稱&價格 */}
        <div className="flex flex-row justify-between">
            <p>生活裡的花與器｜風格美感花藝選搭課｜floral design.</p>
            <p>$ 1,688 NTD</p>
        </div>
        {/* 2. 課程時間 */}
        <div className="flex flex-row justify-between">
            <p>課程時間</p>
            <p>2025-01-11~ 2025-01-11</p>
        </div>
        {/* 3. 課程地址 */}
        <div className="flex flex-row justify-between">
            <p>課程地址</p>
            <p>台北市內湖區文德路10號</p>
        </div>
        {/* 4. 課程備註 */}
        <div className="flex flex-row justify-between">
            <p> </p>
            <p className='note'>*請於付款後，致電品牌方進行預約確認，謝謝您。</p>
        </div>      
    </div>

    {/*---------- 中—— 付款方式 ----------*/}
    <div className="detail">
        <div className="orderTitle"><p>付款方式</p></div>
        <hr />
        {/* 1. 信用卡 */}
        <div className="paymentTitle flex flex-row justify-between">
            <Checkbox defaultSelected color="default">信用卡一次付清</Checkbox>
            <div className="credit flex flex-row">
                <img className="paymentImg" src="https://logos-world.net/wp-content/uploads/2020/06/Visa-Logo-2006.png" alt="" />
                <img className="paymentImg" src="https://pngimg.com/d/mastercard_PNG16.png" alt="" />
            </div>
        </div>
            {/* 信用卡內容（白底） */}
            <div className="paymentContent">
            <p className='px-16'>本公司採用綠界科技（ECPay）金流交易系統，當您選擇信用卡付款時，將會跳轉至綠界的安全支付頁面進行交易。本公司不會儲存您的信用卡資訊，以確保您的隱私與安全，請安心付款。</p>               
            </div>
        {/* 2. linePay */}
        <div className="paymentTitle flex flex-row justify-between">
            <Checkbox color="default">Line Pay</Checkbox>
            <img className="paymentImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/LINE_Pay_logo_%282019%29.svg/1044px-LINE_Pay_logo_%282019%29.svg.png" alt="" />
        </div>
        {/* linepay內容（白底） */}
        <div className="paymentContent px-16">
            <div className="creditNum">
            <p className='px-16'>當您選擇 Line Pay 付款時，將會跳轉至 Line Pay 官方支付頁面進行交易。本公司不會儲存您的付款資訊，以確保您的隱私與安全。</p>
        </div>

    </div>

    </div>

    {/*---------- 下—— 送出訂單 ----------*/}
    <div className="detail mb-8">
        <div className="orderTitle"><p>送出訂單</p></div>
        <hr />

        {/* 課程名稱+結帳價格 */}
        <div className="flex flex-row justify-between">
            <p>生活裡的花與器｜風格美感花藝選搭課｜floral design.</p>
            <p className='totlePrice'>$ 1,688 NTD</p>
        </div>
        <div className="flex flex-row justify-between">
            <p> </p>
            <div className='flex flex-row gap-4 mt-12'>
                <BtnCTA text={"取消"} />
                <BtnCTA text={"送出"} />
            </div>
        </div>
    </div>


    </>
  )
}
