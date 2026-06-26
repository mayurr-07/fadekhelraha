import * as React from "react"

export const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { opts?: any }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-full ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
})
Carousel.displayName = "Carousel"

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => containerRef.current!)

  // Drag-to-scroll logic
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      // Only drag if left click
      if (e.button !== 0) return
      isDown = true
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
    }

    const handleMouseUp = () => {
      isDown = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.5 // Scroll speed multiplier
      el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener("mousedown", handleMouseDown)
    el.addEventListener("mouseleave", handleMouseLeave)
    el.addEventListener("mouseup", handleMouseUp)
    el.addEventListener("mousemove", handleMouseMove)

    return () => {
      el.removeEventListener("mousedown", handleMouseDown)
      el.removeEventListener("mouseleave", handleMouseLeave)
      el.removeEventListener("mouseup", handleMouseUp)
      el.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex overflow-x-auto select-none ${className || ""}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`shrink-0 ${className || ""}`}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"
