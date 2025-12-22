"use client";

import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";
import Polaroid from "@/components/Polaroid";
import FlashOverlay from "@/components/FlashOverlay";
import { experiences, Experience, Photo } from "@/data/experiences";
import { getCurveX, getSpacing } from "@/utils/curve";

const FLASH_DURATION = 0.5; // in seconds

interface PolaroidData {
  experience: Experience;
  photo: Photo;
  index: number;
  rotation: number;
}

export default function Home() {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // On mobile, use clientWidth to exclude scrollbar for accurate centering
      const width = window.innerWidth <= 768 
        ? (document.documentElement.clientWidth || window.innerWidth)
        : window.innerWidth;
      setWindowWidth(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleThumbtackClick = (experience: Experience, index: number) => {
    // Randomly select a photo from the experience's photos
    const randomPhoto = experience.photos[Math.floor(Math.random() * experience.photos.length)];
    
    // Generate random rotation angle between -15 and 15 degrees
    const randomRotation = Math.random() * 30 - 15;
    // const randomRotation = 0;

    // Trigger flash by incrementing key to force remount
    setFlashKey(prev => prev + 1);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), FLASH_DURATION * 1000);

    // Add new Polaroid to the array after flash
    setTimeout(() => {
      setPolaroids(prev => [...prev, { experience, photo: randomPhoto, index, rotation: randomRotation }]);
    }, 50);
  };

  const getPolaroidPosition = (index: number) => {
    const centerX = (windowWidth > 0 ? windowWidth / 2 : 800);
    const wideScreen = windowWidth >= 1152;
    const thinScreen = windowWidth <= 768;

    if (index === 0) {
      return {
        top: thinScreen ? 200 : 40, // Much lower on mobile
        horizontal: centerX - (wideScreen ? 300 : thinScreen ? 100 : 250),
      };
    }
    
    // Calculate position along sin wave (matching Timeline)
    const y = 240 + index * getSpacing();
    const x = centerX + getCurveX(y, windowWidth);
    
    // Position Polaroid offset from the thumbtack
    // For xl/2xl screens: offsetX = x < centerX ? -300 : 300
    // For lg and lower screens: offsetX = x < centerX ? 300 : -300
    // For mobile (thinScreen): use 200 instead of 300
    const polaroidWidth = thinScreen ? 200 : 300;
    const offsetX = wideScreen 
      ? (x < centerX ? -300 : 300)
      : (x < centerX ? polaroidWidth : -polaroidWidth);
    
    // On mobile, make polaroids appear slightly lower
    const placementY = wideScreen ? y - 50 : (thinScreen ? y - 100 : y - 200);

    return {
      top: placementY,
      horizontal: x + offsetX,
    };
  };

  return (
    <main className="min-h-screen relative">
      <FlashOverlay key={flashKey} isVisible={showFlash} duration={FLASH_DURATION} />
      
      <Timeline 
        experiences={experiences} 
        onThumbtackClick={handleThumbtackClick}
      />
      
      {/* Polaroids */}
      {polaroids.map((polaroid, i) => (
        <Polaroid
          key={`${polaroid.index}-${i}-${polaroid.photo.imageUrl}`}
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

