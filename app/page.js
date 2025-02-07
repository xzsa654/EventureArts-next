'use client'
import { Button } from '@heroui/react'
import { button, commonColors, semanticColors } from '@heroui/theme'
export default function Home() {
  const colorShow = (color, text = true) => {
    const arr = Array(10)
      .fill(100)
      .map((r, i) => {
        let count = r * i
        if (count <= 0) {
          return (
            <Button
              key={i}
              className={`bg-${color}-50 m-2 ${text ? 'text-white' : ''}`}
            >
              {`${color}-50`}
            </Button>
          )
        } else {
          return (
            <Button
              key={i}
              className={`bg-${color}-${count} m-2 ${text ? 'text-white' : ''}`}
            >
              {`${color}-${count}`}
            </Button>
          )
        }
      })
    return arr
  }

  return (
    <>
      <h3 className="font-mono ">primary</h3>
      <Button color="primary">Default</Button>
      {colorShow('primary')}
      <hr />
      <h3>secondary</h3>
      <Button color="secondary">Default</Button>
      <h3>yellow</h3>
      <Button className="bg-green">Default</Button>
      {colorShow('green', false)}
      <hr />
      <h3>green</h3>
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
      <p>----------------------------------------------</p>
      <h1 className="text-6xl mb-2 font-unna tracking-wide">
        EVENTUREARTS(font-unna)
      </h1>
      <h1 className="text-6xl mb-2 font-unna tracking-[.2em]">
        EVENTUREARTS(font-unna)
      </h1>
      <h1 className="mb-2 text-6xl font-cn tracking-[.2em]">
        字型測試(font-cn)
      </h1>
      <h1 className="mb-2 text-6xl font-cn">字型測試(font-cn)</h1>
      <h1 className="mb-2 text-6xl font-cn ">字型測試(font-cn)</h1>
      <h1 className="text-12">12313213</h1>
      <h1 className="text-16">12313213</h1>
      <h1>123</h1>
      <p className="text-3xl">測試P</p>
      <p className="">測試P</p>
      <div>54456</div>
      <div
        className=" h-80 border border-5 overflow-scroll
"
      >
        <h1>
          Loremredgrr ipsum dolor, sit amet consectetur adipisicing elit.
          Corporis ipsum esse nam, impedit vitae eius ipsam itaque incidunt sit
          minima aliquid dolores nisi quasi reiciendis, pariatur in. Placeat,
          doloremque.
        </h1>
        Perferendis.
      </div>
      <Button className="bg-secondary-50">Default</Button>
      <Button className="bg-secondary-100">Default</Button>
      <Button className="bg-secondary-200">Default</Button>
      <Button className="bg-secondary-300">Default</Button>
      <Button className="bg-secondary-400">Default</Button>
      <Button className="bg-secondary-500">Default</Button>
      <Button className="bg-secondary-600">Default</Button>
      <Button className="bg-secondary-700">Default</Button>
      <Button className="bg-secondary-800">Default</Button>
      <Button className="bg-secondary-900">Default</Button>
    </>
  )
}
