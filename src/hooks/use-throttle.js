import { useState, useEffect, useRef } from "react";

const useThrottle = (callFn, delay) => {
  const [throttledValue, setThrottledValue] = useState(callFn);

  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecuted.current;

      if (timeElapsed >= delay) {
        setThrottledValue(callFn);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(timeHandler);
    };
  }, [callFn, delay]);

  return throttledValue;
};

export { useThrottle };
