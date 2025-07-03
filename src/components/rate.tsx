import React, { useState } from 'react';
import './rate.css';

interface RateProps {
  value?: number; // 当前分数
  max?: number; // 最大分数
  onChange?: (value: number) => void;
  allowHalf?: boolean; // 是否允许半星
  readOnly?: boolean;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  lockAfterRate?: boolean; // 评分后锁定
}

const Rate: React.FC<RateProps> = ({
  value = 0,
  max = 5,
  onChange,
  allowHalf = false,
  readOnly = false,
  color = '#faad14',
  className,
  style,
  lockAfterRate = false
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const getStarClass = (i: number) => {
    const val = hoverValue !== null ? hoverValue : value;
    if (val >= i + 1) return 'rate-star full';
    if (allowHalf && val >= i + 0.5) return 'rate-star half';
    return 'rate-star';
  };

  const handleClick = (i: number, isHalf: boolean) => {
    if (readOnly || (lockAfterRate && locked)) return;
    let newValue = isHalf ? i + 0.5 : i + 1;
    onChange && onChange(newValue);
    if (lockAfterRate) setLocked(true);
  };

  const handleMouseMove = (i: number, e: React.MouseEvent) => {
    if (readOnly || (lockAfterRate && locked)) return;
    if (allowHalf) {
      const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - left;
      setHoverValue(x < width / 2 ? i + 0.5 : i + 1);
    } else {
      setHoverValue(i + 1);
    }
  };

  const handleMouseLeave = () => {
    if (readOnly || (lockAfterRate && locked)) return;
    setHoverValue(null);
  };

  return (
    <div className={["rate-wrapper", className, (readOnly || (lockAfterRate && locked)) ? 'readonly' : ''].filter(Boolean).join(' ')} style={style} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={getStarClass(i)}
          style={{ color }}
          onClick={e => handleClick(i, allowHalf && hoverValue === i + 0.5)}
          onMouseMove={e => handleMouseMove(i, e)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ pointerEvents: 'none', display: 'block' }}>
            <defs>
              <linearGradient id={`half-gradient-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor={color} />
                <stop offset="50%" stopColor="#e4e4e4" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.5 5.5,21 7,14.1 2,9.3 9,9"
              fill={getStarClass(i) === 'rate-star half' ? `url(#half-gradient-${i})` : getStarClass(i) === 'rate-star full' ? color : '#e4e4e4'}
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default Rate; 