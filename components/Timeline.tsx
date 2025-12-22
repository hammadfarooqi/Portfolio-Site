"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/data/experiences";
import { getCurveX, getSpacing } from "@/utils/curve";
import Notecard from "@/components/Notecard";
import HeaderNotecard from "@/components/HeaderNotecard";
import { Indie_Flower } from "next/font/google";

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
});

interface TimelineProps {
  experiences: Experience[];
  onThumbtackClick: (experience: Experience, index: number) => void;
}

export default function Timeline({ experiences, onThumbtackClick }: TimelineProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const amplitude = 150; // Horizontal amplitude of the sin wave
  const frequency = 0.01; // Frequency of the sin wave (lower = more stretched)
  const spacing = Math.PI / frequency; // One experience per half-period (π radians)
  const totalHeight = experiences.length * spacing + 360; // Total height needed

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
    for (let y = 0; y <= totalHeight; y += 2) {
      const x = centerX + getCurveX(Math.max(y, 180));
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Calculate position for each thumbtack along the sin wave
  const getThumbtackPosition = (index: number) => {
    const y = 250 + index * getSpacing();
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
        // Stable rotation based on index
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
            {index === 0 ? (
              <>
                <HeaderNotecard
                  experience={experience}
                  onClick={() => onThumbtackClick(experience, index)}
                  rotation={rotation}
                />
                {/* Instruction text with camera icon */}
                <div
                  className="absolute top-full mt-12 left-[65%] flex items-start gap-2"
                  style={{
                    transform: 'translate(-50%, 0) rotate(-4deg)',
                  }}
                >
                  <svg
                    className="w-7 h-7 text-gray-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className={`text-sm text-gray-600 ${indieFlower.className} min-w-[200px]`}>
                    <p className="whitespace-nowrap">Point & Click to take Snapshots</p>
                    <p>of each Notecard!</p>
                  </div>
                </div>
              </>
            ) : (
              <Notecard
                experience={experience}
                onClick={() => onThumbtackClick(experience, index)}
                rotation={rotation}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

