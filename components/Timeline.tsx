"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/data/experiences";

interface TimelineProps {
  experiences: Experience[];
  onThumbtackClick: (experience: Experience, index: number) => void;
}

export default function Timeline({ experiences, onThumbtackClick }: TimelineProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const amplitude = 150; // Horizontal amplitude of the sin wave
  const frequency = 0.01; // Frequency of the sin wave (lower = more stretched)
  const spacing = Math.PI / frequency; // One experience per half-period (π radians)
  const totalHeight = experiences.length * spacing + 160; // Total height needed

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
    for (let y = 80; y <= totalHeight; y += 2) {
      const x = centerX + Math.sin(y * frequency) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Calculate position for each thumbtack along the sin wave
  const getThumbtackPosition = (index: number) => {
    const y = 80 + index * spacing;
    const x = centerX + Math.sin(y * frequency) * amplitude;
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
      
      {/* Thumbtacks */}
      {experiences.map((experience, index) => {
        const position = getThumbtackPosition(index);
        const isLeft = Math.sin(position.y * frequency) < 0;
        
        return (
          <div
            key={index}
            className="absolute z-10 flex items-center gap-8 cursor-pointer group"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => onThumbtackClick(experience, index)}
          >
            {/* Thumbtack icon */}
            <div className="relative">
              <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-800 group-hover:scale-110 transition-transform" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800" />
            </div>
            
            {/* Title and date */}
            <div className={`flex flex-col ${isLeft ? 'items-end text-right' : 'items-start text-left'}`}>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                {experience.title}
              </h3>
              <p className="text-sm text-gray-500">{experience.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

