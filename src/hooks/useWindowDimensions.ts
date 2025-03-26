import { useEffect, useState } from "react";

/**
 * A custom hook that provides the current window dimensions.
 *
 * This hook initializes with the current window dimensions and
 * updates them whenever the window is resized.
 *
 * @returns {Object} An object containing the current window width and height.
 * @property {number} width - The current width of the window.
 * @property {number} height - The current height of the window.
 */
export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    /**
     * Updates the dimensions state with the current window dimensions.
     */
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
}
