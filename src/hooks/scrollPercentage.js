import { useWindowScroll } from './windowScroll';

export const useScrollPercentage = (ref = { scrollHeight: 1000 }) => {
  const { y } = useWindowScroll();
  const { current: { scrollHeight } } = ref;
  const topOffset = 60;
  const bottomOffset = 200;
  return (y - topOffset) * 100 / (scrollHeight - bottomOffset)
}