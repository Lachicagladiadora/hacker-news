import { useEffect, useRef, useState } from "react";

export const useIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver((entries) => {
      console.log({ entries });
      entries.forEach((cur) => {
        console.log(cur.isIntersecting);
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
  }, []);

  return [elementRef, isIntersecting];
};
