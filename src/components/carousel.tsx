import React, { CSSProperties, ReactNode, useState, useRef, useEffect } from 'react'
import './carousel.css'
import classnames from 'classnames'
import { useGesture, useDrag } from 'react-use-gesture'

interface IACarouselProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  duration?: number
  currentIndex?: number
}

interface IACarouselInstance {
  next: () => void
  prev: () => void
}

export default function ACarousel (props: IACarouselProps) {
  const {
    className,
    style,
    children=[<img src="https://mmsite.alicdn.com/42deaf65-3c70-4281-91d1-40a9e7ac0441.jpg"/>, <img src="https://mmsite.alicdn.com/863f6c64-e23c-4b90-917a-c6534c4833a6.png"/>, <img src="http://mmsite.alicdn.com/cc826113-ceb2-4313-9d0b-1157c34828c0.jpg"/>],
    duration=1000,
    currentIndex=1
  } = props

  // 当前显示在第几页
  const [active, setActive] = useState(currentIndex)

  const autoPlayIntervalRef = useRef<any>(null)
  const isDraged = useRef(false)

  // const bind = useGesture({
  //   onDragStart: () => {
  //     isDraged.current = false
  //   },
  //   onDrag: ({ movement: [x] }) => {
  //     if (isDraged.current) {
  //       return
  //     }
  //     // console.log()
  //     if (x > 50) {
  //       hanldPrev()
  //       isDraged.current = true
  //     } else if (x < -50) {
  //       hanldNext()
  //       isDraged.current = true
  //     }
  //   },
  //   onDragEnd: () => {
  //     isDraged.current = false
  //   }
  // })

  const cls = classnames(
    'a-carousel',
    className
  )

  const allCarouselContainer = useRef<any>(null)
  const container = useRef<any>(null)

  // 获取当前容器的宽度
  const containerWidth = container?.current?.clientWidth

  useEffect(() => {
    setTransition()
  }, [active])

  const setTransition = () => {
    // 计算需要移动的距离并修改
    const distance = (1 - active) * containerWidth
    allCarouselContainer.current.style.transform = `translate3d(${distance}px, 0, 0)`
  }

  // 上一页
  const hanldPrev = () => {
    // 处理临界情况
    setActive(active === 1 ? React.Children.count(children) : active - 1)
  }

  // 下一页
  const hanldNext = () => {
    // 处理临界情况
    setActive(active === React.Children.count(children) ? 1 : active + 1)
  }

  const stop = () => {
    clearInterval(autoPlayIntervalRef.current)
  }

  const autoPlay = () => {
    stop()
    autoPlayIntervalRef.current = setInterval(hanldNext, duration)
  }

  useEffect(() => {
    autoPlay()
    return () => {
      clearInterval(autoPlayIntervalRef.current)
    }
  }, [ children ])

  // 鼠标移入之后停止轮播
  const carouselContainer = document.getElementById('carouselContainer')
  if (carouselContainer) {
    carouselContainer.onmouseover = function () {
      stop()
    }
    carouselContainer.onmouseout = function () {
      autoPlay()
    }
  }

  return (
    <>
      {/* <div { ...bind() } ref={container} className={cls}> */}
      <div ref={container} className={cls}>
        <div id="carouselContainer" ref={allCarouselContainer} className="a-carousel-container">
          {
            React.Children.map(children, (child, index) => {
              return(
                <div style={{left: index * containerWidth}} className="a-carousel-item">
                  {child}
                </div>
              )
            })
          }
        </div>

        <div>
          <div onClick={hanldPrev} className="a-carousel-left-btn">Left</div>
          <div onClick={hanldNext} className="a-carousel-right-btn">Right</div>
        </div>
      </div>
    </>
  )
}