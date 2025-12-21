"use client";

import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";
import Polaroid from "@/components/Polaroid";
import FlashOverlay from "@/components/FlashOverlay";
import { experiences, Experience } from "@/data/experiences";

export default function Home() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThumbtackClick = (experience: Experience, index: number) => {
    // Trigger flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 100);

    // Set selected experience after flash
    setTimeout(() => {
      setSelectedExperience(experience);
      setSelectedIndex(index);
    }, 50);
  };

  const getPolaroidPosition = (index: number) => {
    const spacing = 200;
    // Account for py-20 padding (80px) and calculate position
    const topPosition = 80 + index * spacing;
    // Position Polaroid to the right of the timeline (center + 100px)
    const leftPosition = windowWidth > 0 ? windowWidth / 2 + 100 : 800;
    return {
      top: topPosition - 50,
      left: leftPosition,
    };
  };

  return (
    <main className="min-h-screen bg-background relative">
      <FlashOverlay isVisible={showFlash} />
      
      <Timeline 
        experiences={experiences} 
        onThumbtackClick={handleThumbtackClick}
      />
      
      {selectedExperience && selectedIndex !== null && (
        <Polaroid
          experience={selectedExperience}
          position={getPolaroidPosition(selectedIndex)}
        />
      )}
    </main>
  );
}

