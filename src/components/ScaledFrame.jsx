import { useRef, useEffect, useState } from 'react'

/**
 * Scales a fixed-size Figma frame to fit the available container width.
 * All children render at their original pixel dimensions, then scaled down.
 */
// NAV_HEIGHT: the two fixed bars at the top of the app (view selector + screen tabs)
const NAV_HEIGHT = 76

export default function ScaledFrame({ frameWidth = 1920, frameHeight = 1080, children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const scaleW = el.offsetWidth / frameWidth
      const availableH = window.innerHeight - NAV_HEIGHT
      const scaleH = availableH / frameHeight
      setScale(Math.min(scaleW, scaleH))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [frameWidth, frameHeight])

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
