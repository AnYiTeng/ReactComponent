import React, { CSSProperties, ReactNode } from 'react'
import './carousel.css'
import classnames from 'classnames'

interface IACarouselProps {
  className?: string
  style?: CSSProperties
  imgList?: string[]
  duration?: number
}

interface IACarouselInstance {
  next: () => void
  prev: () => void
}

export default function ACarousel () {
  return (
    <>
    </>
  )
}