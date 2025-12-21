"use client";

import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";
import Polaroid from "@/components/Polaroid";
import FlashOverlay from "@/components/FlashOverlay";
import { experiences, Experience } from "@/data/experiences";

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
    const amplitude = 150;
    const frequency = 0.01;
    const spacing = Math.PI / frequency; // One experience per half-period (π radians)
    const centerX = (windowWidth > 0 ? windowWidth / 2 : 800);
    
    // Calculate position along sin wave (matching Timeline)
    const y = 80 + index * spacing;
    const x = centerX + Math.sin(y * frequency) * amplitude;
    
    // Position Polaroid offset from the thumbtack
    const isLeft = Math.sin(y * frequency) < 0;
    const offsetX = isLeft ? -300 : 300; // Offset to the side of the wave
    
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

