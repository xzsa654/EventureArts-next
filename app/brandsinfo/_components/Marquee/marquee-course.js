'use client'

import ScrollVelocity from './ScrollVelocity'

const MarqueeCourse = ({ velocity = 100, className = '' }) => {
  return (
    <ScrollVelocity
      texts={['Course', '近期課程']}
      velocity={velocity}
      numCopies={8} /* 增加副本數量 */
      className={className}
    />
  )
}

export default MarqueeCourse
