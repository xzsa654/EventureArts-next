'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PRODUCT } from '@/lib/course-api';

export default function CIdPage(props) {
    const params =useParams()
    console.log(params);
    const {c_id}=params
     useEffect(() => {
        fetch(PRODUCT+c_id
        ) // 後端 API URL
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
     })
            // setCourseTitle(data.c_name )})
          .catch((error) => console.error("Error fetching course title:", error));
      }, []);

  return (
    <>
      <div>CId Page</div>
    </>
  )
}
