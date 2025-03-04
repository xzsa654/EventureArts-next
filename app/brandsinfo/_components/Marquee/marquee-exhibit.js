'use client'

import ScrollVelocity from "./ScrollVelocity";

const MarqueeExhibit = ({ velocity = 100, className = "" }) => {
  return (
    <ScrollVelocity
      texts={["Exhibition", "近期展覽"]}
      velocity={velocity}
      numCopies={8} /* 增加副本數量 */
      className={className}
    />
  );
};

export default MarqueeExhibit;