"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/data/experiences";
import { getCurveX, getSpacing } from "@/utils/curve";
import Notecard from "@/components/Notecard";

interface TimelineProps {
  experiences: Experience[];
  onThumbtackClick: (experience: Experience, index: number) => void;
}

export default function Timeline({ experiences, onThumbtackClick }: TimelineProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const amplitude = 150; // Horizontal amplitude of the sin wave
  const frequency = 0.01; // Frequency of the sin wave (lower = more stretched)
  const spacing = Math.PI / frequency; // One experience per half-period (π radians)
  const totalHeight = experiences.length * spacing + 280; // Total height needed

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = windowWidth > 0 ? windowWidth / 2 : 800;

  // Generate sin wave path
  const generatePath = () => {
    const points: string[] = [];
    for (let y = 80; y <= totalHeight - 80; y += 2) {
      const x = centerX + getCurveX(y);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Calculate position for each thumbtack along the sin wave
  const getThumbtackPosition = (index: number) => {
    const y = 80 + 100 + index * getSpacing();
    const x = centerX + getCurveX(y);
    return { x, y };
  };

  return (
    <div className="relative min-h-screen py-20" style={{ height: totalHeight }}>
      {/* Sin wave SVG path */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <path
          d={generatePath()}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="5,5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      
      {/* Notecards */}
      {experiences.map((experience, index) => {
        const position = getThumbtackPosition(index);
        // Add slight random rotation for organic feel (between -3 and 3 degrees)
        const rotation = (index % 5 - 2) * 1.5;
        
        return (
          <div
            key={index}
            className="absolute z-10"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Notecard
              experience={experience}
              onClick={() => onThumbtackClick(experience, index)}
              rotation={rotation}
            />
          </div>
        );
      })}
    </div>
  );
}

