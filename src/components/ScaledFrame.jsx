import { useRef, useEffect, useState } from 'react'

/**
 * Scales a fixed-size Figma frame to fit the available container width.
 * All children render at their original pixel dimensions, then scaled down.
 */
export default function ScaledFrame({ frameWidth = 1920, frameHeight = 1080, children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / frameWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [frameWidth])

  return (
    <div ref={containerRef} style={{ height: frameHeight * scale, overflow: 'hidden' }}>
      <div
        style={{
          width: frameWidth,
          height: frameHeight,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
