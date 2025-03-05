'use client'

import React, { useState, useEffect } from 'react'
import { BsArrowRight } from "react-icons/bs";
import Link from 'next/link';

import {Button} from "@heroui/react";

    export default function BtnCTA({text, href}) {

      const validHref = href || '/course'; 

      return (
        <>
        <div className="flex gap-4 items-center">
        <Link href={validHref}>
          <Button radius="full" className="bg-[#000000] text-white text-[15px] h-[50px]">
            <span>{text}</span>
            <BsArrowRight />
          </Button>
        </Link>
        </div>
        </>
      );
    }