'use client'

import React, { useState, useEffect } from 'react'

export default function AppPage(props) {
  return (
    <>
      <h3 className="font-mono ">primary</h3>
      <Button color="primary">Default</Button>
      {colorShow('primary')}
      <hr />
      <h3>secondary</h3>
      <Button color="secondary">Default</Button>

      {colorShow('secondary')}
      <hr />
      <h3>yellow</h3>
      <Button className="bg-yellow">Default</Button>

      {colorShow('yellow', false)}
      <hr />
      <h3>red</h3>
      <Button className="bg-red">Default</Button>
      {colorShow('red')}
      <hr />
      <h3>zinc(Dark Gray)</h3>
      <Button className="bg-zinc">Default</Button>
      <hr />
      <h3>gray</h3>
      <Button className="bg-gray">Default</Button>
      {colorShow('gray', false)}
      <hr />
      <h1 className="mb-2 text-6xl ">字型測試(中文預設)</h1>
      <h1 className="mb-2 text-6xl ">HELLO WORLD(EN-Default)</h1>
      <h1 className="mb-2 text-6xl font-cn">字型測試(font-cn)</h1>
      <h1 className="text-6xl mb-2 font-logo">EVENTUREARTS(font-logo)</h1>
      <h1 className="text-6xl mb-2 font-kanit">EVENTUREARTS(font-kanit)</h1>
      <h1 className="text-6xl mb-2 font-unna">EVENTUREARTS(font-unna)</h1>
      <Button className="bg-gray-50">Default</Button>
      <Button className="bg-gray-100">Default</Button>
      <Button className="bg-gray-200">Default</Button>
      <Button className="bg-gray-300">Default</Button>
      <Button className="bg-gray-400">Default</Button>
      <Button className="bg-gray-500">Default</Button>
      <Button className="bg-gray-600">Default</Button>
      <Button className="bg-gray-700">Default</Button>
      <Button className="bg-gray-800">Default</Button>
      <Button className="bg-gray-900">Default</Button>
    </>
  )
}
