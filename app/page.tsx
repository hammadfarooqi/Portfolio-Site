"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import Timeline from "@/components/Timeline";
import Polaroid from "@/components/Polaroid";
import FlashOverlay from "@/components/FlashOverlay";
import { experiences } from "@/data/experiences";
import { Experience, PolaroidData } from "@/types";
import { getCurveX, getSpacing } from "@/utils/curve";
import { shuffleArray } from "@/utils/shuffle";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { isMobileWidth, isWideScreen } from "@/constants/breakpoints";

const FLASH_DURATION = 0.5; // in seconds

export default function Home() {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const windowWidth = useWindowWidth();
  // State for shuffle-and-cycle photo selection
  const [shuffledPhotos, setShuffledPhotos] = useState<Map<number, typeof experiences[0]['photos']>>(new Map());
  const [photoIndices, setPhotoIndices] = useState<Map<number, number>>(new Map());
  const polaroidIdCounter = useRef(0);
  const shuffledPhotosRef = useRef(shuffledPhotos);
  const photoIndicesRef = useRef(photoIndices);
  
  // Keep refs in sync with state
  shuffledPhotosRef.current = shuffledPhotos;
  photoIndicesRef.current = photoIndices;

  const handleThumbtackClick = useCallback((experience: Experience, index: number) => {
    // Read current state values using refs (synchronous access)
    const currentShuffled = shuffledPhotosRef.current.get(index);
    const currentIndex = photoIndicesRef.current.get(index) ?? 0;
    
    // Get or create shuffled photos array for this experience
    let shuffled = currentShuffled;
    let needsReshuffle = !currentShuffled;
    
    if (!shuffled) {
      shuffled = shuffleArray(experience.photos);
    }
    
    // Get the photo at current index
    const selectedPhoto = shuffled[currentIndex];
    
    // Calculate next index
    let nextIndex = currentIndex + 1;
    if (nextIndex >= shuffled.length) {
      // Cycle complete - reshuffle and reset
      shuffled = shuffleArray(experience.photos);
      nextIndex = 0;
      needsReshuffle = true;
    }
    
    // Batch state updates (React 18 automatically batches these)
    if (needsReshuffle) {
      setShuffledPhotos(prev => {
        const newMap = new Map(prev);
        newMap.set(index, shuffled!);
        return newMap;
      });
    }
    
    setPhotoIndices(prev => {
      const newMap = new Map(prev);
      newMap.set(index, nextIndex);
      return newMap;
    });
    
    // Generate random rotation angle between -15 and 15 degrees
    const randomRotation = Math.random() * 30 - 15;
    
    // Generate unique ID for polaroid
    const polaroidId = `polaroid-${polaroidIdCounter.current++}`;

    // Trigger flash animation
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), FLASH_DURATION * 1000);

    // Add new Polaroid to the array after flash
    setTimeout(() => {
      setPolaroids(prev => [...prev, { 
        experience, 
        photo: selectedPhoto, 
        index, 
        rotation: randomRotation,
        id: polaroidId
      }]);
    }, 50);
  }, []);

  const getPolaroidPosition = useCallback((index: number) => {
    const centerX = (windowWidth > 0 ? windowWidth / 2 : 800);
    const wideScreen = isWideScreen(windowWidth);
    const isMobile = isMobileWidth(windowWidth);

    if (index === 0) {
      return {
        top: isMobile ? 200 : 40, // Much lower on mobile
        horizontal: centerX - (wideScreen ? 300 : isMobile ? 100 : 250),
      };
    }
    
    // Calculate position along sin wave (matching Timeline)
    const y = 240 + index * getSpacing();
    const x = centerX + getCurveX(y, windowWidth);
    
    // Position Polaroid offset from the thumbtack
    // For xl/2xl screens: offsetX = x < centerX ? -300 : 300
    // For lg and lower screens: offsetX = x < centerX ? 300 : -300
    // For mobile (isMobile): use 200 instead of 300
    const polaroidWidth = isMobile ? 200 : 300;
    const offsetX = wideScreen 
      ? (x < centerX ? -300 : 300)
      : (x < centerX ? polaroidWidth : -polaroidWidth);
    
    // On mobile, make polaroids appear slightly lower
    const placementY = wideScreen ? y - 50 : (isMobile ? y - 100 : y - 200);

    return {
      top: placementY,
      horizontal: x + offsetX,
    };
  }, [windowWidth]);

  return (
    <main className="min-h-screen relative">
      <FlashOverlay isVisible={showFlash} duration={FLASH_DURATION} />
      
      <Timeline 
        experiences={experiences} 
        onThumbtackClick={handleThumbtackClick}
      />
      
      {/* Polaroids */}
      {polaroids.map((polaroid) => (
        <Polaroid
          key={polaroid.id}
          experience={polaroid.experience}
          photo={polaroid.photo}
          position={getPolaroidPosition(polaroid.index)}
          rotation={polaroid.rotation}
          windowWidth={windowWidth}
        />
      ))}
    </main>
  );
}

