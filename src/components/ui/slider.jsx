"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/30"
    >
      <SliderPrimitive.Range className="absolute h-full bg-white" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-3 w-3 rounded-full border-2 border-white/30 bg-white ring-offset-background transition-colors 
      focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50" 
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
