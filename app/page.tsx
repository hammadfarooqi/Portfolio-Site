"use client";

import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";
import Polaroid from "@/components/Polaroid";
import FlashOverlay from "@/components/FlashOverlay";
import { experiences, Experience } from "@/data/experiences";
import { getCurveX, getSpacing } from "@/utils/curve";

const FLASH_DURATION = 0.5; // in seconds

interface PolaroidData {
  experience: Experience;
  index: number;
  rotation: number;
}

export default function Home() {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThumbtackClick = (experience: Experience, index: number) => {
    // Trigger flash by incrementing key to force remount
    setFlashKey(prev => prev + 1);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), FLASH_DURATION * 1000);

    // Generate random rotation angle between -15 and 15 degrees
    const randomRotation = Math.random() * 30 - 15;

    // Add new Polaroid to the array after flash
    setTimeout(() => {
      setPolaroids(prev => [...prev, { experience, index, rotation: randomRotation }]);
    }, 50);
  };

  const getPolaroidPosition = (index: number) => {
    const centerX = (windowWidth > 0 ? windowWidth / 2 : 800);

    if (index === 0) {
      return {
        top: 40,
        horizontal: centerX - 300,
      };
    }
    
    // Calculate position along sin wave (matching Timeline)
    const y = 240 + index * getSpacing();
    const x = centerX + getCurveX(y);
    
    // Position Polaroid offset from the thumbtack
    const offsetX = x < centerX ? -300 : 300; // Offset to the side of the wave
    
    return {
      top: y - 50,
      horizontal: x + offsetX,
    };
  };

  return (
    <main className="min-h-screen bg-background relative">
      <FlashOverlay key={flashKey} isVisible={showFlash} duration={FLASH_DURATION} />
      
      <Timeline 
        experiences={experiences} 
        onThumbtackClick={handleThumbtackClick}
      />
      
      {/* Polaroids */}
      {polaroids.map((polaroid, i) => (
        <Polaroid
          key={`${polaroid.index}-${i}`}
          experience={polaroid.experience}
          position={getPolaroidPosition(polaroid.index)}
          rotation={polaroid.rotation}
        />
      ))}
    </main>
  );
}

