import { useEffect, useState } from "react";

const isWindowUnd = () => typeof window !== "undefined";

// export default function useSize() {
//   const [windowDimension, detectHW] = useState({
//     // winWidth: isWindowUnd() ? window.innerWidth : 0,
//     // winHeight: isWindowUnd() ? window.innerHeight : 0,
//     winWidth: window?.innerWidth,
//     winHeight: window?.innerHeight,
//   });
//   const detectSize = () => {
//     detectHW({
//       winWidth: window?.innerWidth,
//       winHeight: window?.innerHeight,
//     });
//   };

//   useEffect(() => {
//     if (!(typeof window !== "undefined")) {
//       return;
//     }
//     return () => {
//       window.removeEventListener("resize", detectSize);
//     };
//   }, [windowDimension]);

//   return [windowDimension.winWidth, windowDimension.winHeight];
// }

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
