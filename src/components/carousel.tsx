import React, {
  CSSProperties,
  ReactNode,
  useState,
  useRef,
  useEffect
} from "react";
import "./carousel.css";
import classnames from "classnames";

interface IACarouselProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode[];
  duration?: number;
  currentIndex?: number;
  isAutoPlay?: boolean;
  width?: number | string;
  height?: number | string;
}

export default function ACarousel(props: IACarouselProps) {
  const {
    className,
    style,
    children = [
      <img src="https://mmsite.alicdn.com/42deaf65-3c70-4281-91d1-40a9e7ac0441.jpg" alt="1" />,
      <img src="https://mmsite.alicdn.com/863f6c64-e23c-4b90-917a-c6534c4833a6.png" alt="2" />,
      <img src="https://mmsite.alicdn.com/863f6c64-e23c-4b90-917a-c6534c4833a6.png" alt="3" />
    ],
    duration = 3000,
    currentIndex = 0,
    isAutoPlay = true,
    width = 300,
    height = 160
  } = props;

  const [active, setActive] = useState(currentIndex);
  const [containerWidth, setContainerWidth] = useState<number>(typeof width === 'number' ? width : 300);
  const autoPlayIntervalRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = React.Children.count(children);

  // 宽度自适应
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 自动播放
  useEffect(() => {
    if (!isAutoPlay) return;
    autoPlayIntervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % count);
    }, duration);
    return () => clearInterval(autoPlayIntervalRef.current);
  }, [isAutoPlay, duration, count]);

  // 鼠标悬停暂停
  const handleMouseEnter = () => {
    clearInterval(autoPlayIntervalRef.current);
  };
  const handleMouseLeave = () => {
    if (isAutoPlay) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActive(prev => (prev + 1) % count);
      }, duration);
    }
  };

  // 切换
  const goTo = (idx: number) => setActive(idx);
  const prev = () => setActive(active === 0 ? count - 1 : active - 1);
  const next = () => setActive((active + 1) % count);

  // 轮播内容样式
  const trackStyle: React.CSSProperties = {
    width: containerWidth * count,
    display: 'flex',
    transform: `translateX(${-active * containerWidth}px)`,
    transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)'
  };

  return (
    <div
      className={classnames('a-carousel', className)}
      style={{ width, height, ...style, position: 'relative', overflow: 'hidden' }}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="a-carousel-track" style={trackStyle}>
        {React.Children.map(children, (child, idx) => (
          <div className="a-carousel-item" style={{ width: containerWidth, height: '100%', flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>
      {/* 指示点 */}
      <div className="a-carousel-dots">
        {Array.from({ length: count }).map((_, idx) => (
          <span
            key={idx}
            className={classnames('a-carousel-dot', { active: idx === active })}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
      {/* 左右按钮 */}
      <button className="a-carousel-btn a-carousel-btn-left" onClick={prev} aria-label="上一张" type="button">&#8592;</button>
      <button className="a-carousel-btn a-carousel-btn-right" onClick={next} aria-label="下一张" type="button">&#8594;</button>
    </div>
  );
}
