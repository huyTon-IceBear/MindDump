"use client";
import { useCallback, useEffect, useState } from "react";
import classes from "./StarryBackground.module.css";
import { StarsGroupProps } from "@/types/component";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useNotes } from "@/context/NotesProvider";
import { COLOR, DELAYS, SPEED } from "@/constant/StarryBackground";

const generateRandomStar = (
  screenWidth: number,
  screenHeight: number
): string => {
  const hShadow = Math.floor(Math.random() * screenHeight);
  const vShadow = Math.floor(Math.random() * screenWidth);
  return `${vShadow}px ${hShadow}px ${COLOR}`;
};

export default function StarryBackground() {
  const { width, height } = useWindowDimensions();
  const { notes } = useNotes();
  const [stars, setStars] = useState<string[]>([]);

  const generateStars = useCallback(
    (count: number) => {
      return Array.from({ length: count }, () =>
        generateRandomStar(width - 50, height - 150)
      );
    },
    [width, height]
  );

  useEffect(() => {
    setStars((prevStars) => {
      if (notes.length === 0) {
        return [];
      }
      if (notes.length > prevStars.length) {
        const newStars = generateStars(notes.length - prevStars.length);
        return [...prevStars, ...newStars];
      }
      if (notes.length < prevStars.length) {
        return prevStars.slice(0, notes.length);
      }
      // If notes.length === prevStars.length, regenerate all stars
      return generateStars(notes.length);
    });
  }, [notes.length, generateStars]);

  return (
    <div
      style={{
        background: "inherit",
        position: "relative",
        width: "100%",
      }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className={classes.starsGroup}
          style={{
            boxShadow: star,
            animationDuration: `${SPEED}s`,
            animationDelay: `${DELAYS[index % DELAYS.length]}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
