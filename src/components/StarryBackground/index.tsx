"use client";
import { useEffect, useState } from "react";
import classes from "./StarryBackground.module.css";
import { StarsGroupProps } from "@/types/component";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useNotes } from "@/context/NotesProvider";

const generateRandomStars = (
  screenWidth: number,
  color: string,
  density: number
): string => {
  let stars = "";
  for (let i = 0; i < density; i++) {
    const hShadow = Math.floor(Math.random() * screenWidth);
    const vShadow = Math.floor(Math.random() * screenWidth);
    stars += `${hShadow}px ${vShadow}px ${color}`;
    if (i < density - 1) {
      stars += ", ";
    }
  }
  return stars;
};

function StarsGroup({
  screenWidth,
  // color,
  // density,
  speed,
  delay,
}: StarsGroupProps) {
  const color = "#fff";
  const { notes } = useNotes();
  const [boxShadow, setBoxShadow] = useState("");

  useEffect(() => {
    const newStars = generateRandomStars(screenWidth, color, 2);
    if (notes.length > 2) {
      setBoxShadow((prevBoxShadow) => `${prevBoxShadow}, ${newStars}`);
    } else {
      setBoxShadow(generateRandomStars(screenWidth, color, 2));
    }
  }, [screenWidth, color, notes]);

  return (
    <div
      className={classes.starsGroup}
      style={{
        boxShadow: boxShadow,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    ></div>
  );
}

export default function StarryBackground() {
  const { width } = useWindowDimensions();
  const color = "#fff";
  const density = 20;
  const speed = 1;

  const delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5];

  return (
    <div
      style={{
        background: "inherit",
        position: "relative",
        width: "100%",
        top: "-70px",
      }}
    >
      {delays.map((delay, index) => (
        <StarsGroup
          key={index}
          screenWidth={width}
          // color={color}
          // density={notes.length}
          speed={speed}
          delay={delay}
        />
      ))}
    </div>
  );
}
