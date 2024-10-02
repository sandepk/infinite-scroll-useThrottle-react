import React, { useState, useEffect } from "react";
import "./App.css";

import { useThrottle } from "./hooks/use-throttle";

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const throttledHandleResize  = useThrottle(handleResize, 5000);


  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);
    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, []);
  return (
    <div>
      Window size: {windowSize.width} x {windowSize.height}
    </div>
  );
};

export default App;
