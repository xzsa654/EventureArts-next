'use client'

import React, { useState, useEffect } from 'react'
import { BsArrowRight } from "react-icons/bs";

import {Button} from "@heroui/react";

    export default function BtnCTA({text}) {
      return (
        <>
        <div className="flex gap-4 items-center">

          <Button radius="none" className="bg-[#000000] text-white h-full">
            <span>{text}</span>
            <BsArrowRight />
          </Button>
        </div>
        </>
      );
    }