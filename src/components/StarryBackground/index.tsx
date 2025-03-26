'use client'
import { useCallback, useEffect, useState } from 'react'

import { COLOR, DELAYS, SPEED } from '@/constant/StarryBackground'
import { useNotes } from '@/context/NotesProvider'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import classes from './StarryBackground.module.css'

/**
 * StarryBackground component
 *
 * This component creates a dynamic starry background that responds to the number of notes.
 * It generates and manages stars based on the current window dimensions and the number of notes.
 *
 * @returns {JSX.Element} The StarryBackground component
 */
export default function StarryBackground() {
  const { width, height } = useWindowDimensions()
  const { notes } = useNotes()
  const [stars, setStars] = useState<string[]>([])

  /**
   * Generates a random star position
   *
   * @param {number} screenWidth - The width of the screen
   * @param {number} screenHeight - The height of the screen
   * @returns {string} A CSS box-shadow value representing the star's position
   */
  const generateRandomStar = useCallback((screenWidth: number, screenHeight: number): string => {
    const hShadow = Math.floor(Math.random() * screenHeight)
    const vShadow = Math.floor(Math.random() * screenWidth)
    return `${vShadow}px ${hShadow}px ${COLOR}`
  }, [])

  /**
   * Generates an array of star positions
   *
   * @param {number} count - The number of stars to generate
   * @returns {string[]} An array of CSS box-shadow values representing star positions
   */
  const generateStars = useCallback(
    (count: number) => {
      return Array.from({ length: count }, () => generateRandomStar(width - 50, height - 150))
    },
    [width, height, generateRandomStar]
  )

  /**
   * Updates the stars array based on the number of notes
   */
  useEffect(() => {
    setStars((prevStars) => {
      if (notes.length === 0) {
        return []
      }
      if (notes.length > prevStars.length) {
        const newStars = generateStars(notes.length - prevStars.length)
        return [...prevStars, ...newStars]
      }
      if (notes.length < prevStars.length) {
        return prevStars.slice(0, notes.length)
      }
      // If notes.length === prevStars.length, regenerate all stars
      return generateStars(notes.length)
    })
  }, [notes.length, generateStars])

  return (
    <div
      style={{
        background: 'rgb(32,33,36)',
        position: 'relative',
        width: '100%',
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
  )
}
