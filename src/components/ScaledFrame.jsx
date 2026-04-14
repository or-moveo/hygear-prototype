import { useRef, useLayoutEffect, useState } from 'react'

/**
 * Scales a fixed-size Figma frame to fit the available container.
 * Uses the parent element's dimensions so it adapts to whatever space is given.
 */
export default function ScaledFrame({ frameWidth = 1920, frameHeight = 1080, children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const update = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      if (!w || !h) return
      setScale(Math.min(w / frameWidth, h / frameHeight))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [frameWidth, frameHeight])

  return (
    <div ref={containerRef} style={{ width: '100%', height: scale !== null ? frameHeight * scale : 0, overflow: 'hidden' }}>
      {scale !== null && (
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
      )}
    </div>
  )
}
