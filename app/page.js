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
      <h3>primary</h3>
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
    </>
  )
}
