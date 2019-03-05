import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

const getWindowScroll = () => typeof window !== 'undefined' ? {
  x: window.scrollX,
  y: window.scrollY,
} : { x: 0, y: 0 };

export const useWindowScroll = (delay = 10) => {
  const [scroll, setScroll] = useState(getWindowScroll());
  const listener = throttle(delay, () => {
    const { x, y } = getWindowScroll();
    setScroll({ x, y });
  });
  useEffect(() => {
    window.addEventListener('scroll', listener, true);
    return  () => window.removeEventListener('scroll', listener, true);
  }, []);
  return scroll;
}
