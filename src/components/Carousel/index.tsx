import { ActionIcon, Box, Group, Image, NumberInput, Text } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { IconArrowLeft, IconArrowRight, IconTrash } from '@tabler/icons-react'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'

import { CarouselProps } from '@/types/component'
import { UploadedImage } from '@/types/note'

import ImageLightbox from '../ImageLightbox'
import classes from './Carousel.module.css'

export default function Carousel({ sliderData, onDelete, canEdit = true }: CarouselProps) {
  const [hovered, setHovered] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string | number>(selectedIndex + 1) // Initialize with selectedIndex + 1
  const [open, setOpen] = useState(false)

  const ref = useClickOutside(() => {
    setIsEditing(false)
    setValue(selectedIndex + 1)
  })

  // Synchronize value with selectedIndex
  useEffect(() => {
    setValue(selectedIndex + 1) // Update value whenever selectedIndex changes
  }, [selectedIndex])

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      setSelectedIndex((prev) => Math.min(prev + 1, sliderData.length - 1))
    }
  }, [emblaApi, sliderData.length])

  const totalSlides = sliderData.length

  const handleIndicatorClick = () => {
    setIsEditing(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Prevent the default behavior of adding a newline
      // Check if the input value is not empty and a valid number
      if (typeof value === 'number' && value >= 1 && value <= totalSlides) {
        setSelectedIndex(value - 1)
        emblaApi && emblaApi.scrollTo(value - 1)
        setIsEditing(false)
      }
    }
  }

  return (
    <div className="relative">
      {/* Carousel */}
      <div className={classes.embla}>
        <div className={classes.embla__viewport} ref={emblaRef}>
          <div className={classes.embla__container}>
            {sliderData.map((item: UploadedImage, index) => (
              <div className={classes.embla__slide} key={item.id}>
                {/* Image */}
                <Box
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%', // Ensures it takes full width of parent
                    height: '200px', // Matches the image height
                    overflow: 'hidden',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Image
                    src={item.src}
                    h={200}
                    alt="slide_image"
                    onClick={() => setOpen(true)}
                    loading="lazy"
                    w="auto"
                    fit="contain"
                  />
                  {/* Delete Button (Visible on Hover) */}
                  {canEdit && hovered && (
                    <ActionIcon
                      variant="default"
                      size="sm"
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        opacity: 0.8,
                      }}
                      onClick={() => {
                        onDelete(item.id)
                        setSelectedIndex((prevIndex) =>
                          prevIndex >= totalSlides - 1 ? Math.max(totalSlides - 2, 0) : prevIndex
                        )
                      }}
                    >
                      <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  )}
                </Box>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation & Indicators */}
        <Group justify="space-between" mt="xs" mb="xs" px="xs">
          <ActionIcon variant="default" aria-label="prev__image" onClick={scrollPrev} style={{ borderRadius: '50%' }}>
            <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>

          {/* Indicator with Click-to-Edit */}
          <Box className={classes.indicatorBox} onClick={handleIndicatorClick} style={{ height: '40px' }}>
            {isEditing ? (
              <NumberInput
                value={value}
                onChange={setValue} // Handle input changes
                onKeyDown={handleKeyDown} // Handle key presses
                suffix={' / ' + totalSlides}
                min={1}
                max={totalSlides}
                clampBehavior="strict"
                hideControls
                ref={ref}
                styles={{
                  input: { textAlign: 'center', width: '60px', padding: '4px' },
                }}
              />
            ) : (
              <Text size="sm">{selectedIndex + 1 + ' / ' + totalSlides}</Text>
            )}
          </Box>

          <ActionIcon variant="default" aria-label="next__image" onClick={scrollNext} style={{ borderRadius: '50%' }}>
            <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>

      {/* Lightbox Image*/}
      {open && <ImageLightbox images={sliderData} onClose={() => setOpen(false)} selectedIndex={selectedIndex} />}
    </div>
  )
}
