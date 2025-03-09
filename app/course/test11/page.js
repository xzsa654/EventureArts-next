'use client'

import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Test11Page(props) {
    useEffect(() => {
        Swal.fire({
            title: '測試',
            text: '這是 SweetAlert 測試',
            icon: 'success',
            confirmButtonText: 'OK',
        });
        }, []);

  return (
    <>
    </>
  )
}
