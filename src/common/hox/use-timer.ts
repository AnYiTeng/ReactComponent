import { useState, useEffect, useCallback } from 'react';

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); // 计时器状态
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    let interval: any;
    if (isActive) {
      // eslint-disable-next-line
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setSeconds(elapsed);
      }, 1000);
    }

    return () => clearInterval(interval); // 清理定时器
  }, [isActive, startTime]);

  // 启动计时器
  const startTimer = useCallback(() => {
    if (!isActive) {
      setStartTime(Date.now() - seconds * 1000); // 计算初始时间，为了保持已经过的时间
      setIsActive(true);
    }
  }, [isActive, seconds]);

  // 停止计时器
  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  // 重置计时器
  const resetTimer = useCallback(() => {
    setSeconds(0);
    setIsActive(false);
    setStartTime(Date.now());
  }, []);

  const formatTime = (totalSeconds: any) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secondsFormatted = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secondsFormatted}`;
  };

  return { time: seconds, formattedTime: formatTime(seconds), startTimer, stopTimer, resetTimer };
}

export default useTimer;
