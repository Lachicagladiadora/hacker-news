import { useEffect, useRef, useState } from "react";

type UseIntersectionOutput = [
  React.MutableRefObject<HTMLDivElement | null>,
  boolean
];

export const useIntersection = (options = {}): UseIntersectionOutput => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((cur) => {
        setIsIntersecting(cur.isIntersecting);
      });
    }, options);
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting];
};
