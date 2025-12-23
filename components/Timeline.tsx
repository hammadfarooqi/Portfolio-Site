"use client";

import { useMemo } from "react";
import { Experience } from "@/types";
import { getCurveX, getSpacing } from "@/utils/curve";
import Notecard from "@/components/Notecard";
import HeaderNotecard from "@/components/HeaderNotecard";
import { Indie_Flower } from "next/font/google";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { isMobileWidth } from "@/constants/breakpoints";

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
});

interface TimelineProps {
  experiences: Experience[];
  onThumbtackClick: (experience: Experience, index: number) => void;
}

export default function Timeline({ experiences, onThumbtackClick }: TimelineProps) {
  const windowWidth = useWindowWidth();
  
  // Basic padding and spacing constants
  const SPACING = getSpacing();
  const HEADER_OFFSET = 250;
  const totalHeight = experiences.length * SPACING + 400;

  // centerX is now ONLY used for the SVG path rendering, 
  // as the cards will use CSS '50%' for centering.
  const centerX = windowWidth / 2;

  // Memoize the path to prevent expensive re-calculations on every render
  const pathData = useMemo((): string => {
    if (windowWidth === 0) return "";
    const points: string[] = [];
    for (let y = 0; y <= totalHeight; y += 4) {
      const x = centerX + getCurveX(Math.max(y, 180), windowWidth);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  }, [centerX, totalHeight, windowWidth]);

  return (
    <div 
      className="relative min-h-screen py-20 overflow-x-hidden" 
      style={{ height: totalHeight }}
    >
      {/* SVG Background Layer */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        
        <path
          d={pathData}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="5,5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      
      {/* Interactive Experience Layer */}
      {experiences.map((experience, index) => {
        const yPos = HEADER_OFFSET + index * SPACING;
        const curveOffset = getCurveX(yPos, windowWidth);
        
        // Stable rotation logic
        const rotation = (index % 5 - 2) * 1.5;
        
        // Mobile-specific adjustment for the first card - move it higher on mobile
        const finalY = (isMobileWidth(windowWidth) && index === 0) ? yPos - 150 : yPos;
        
        // Center HeaderNotecard on mobile (index === 0)
        const finalCurveOffset = (isMobileWidth(windowWidth) && index === 0) ? 0 : curveOffset;

        return (
          <div
            key={index}
            className="absolute z-10 transition-all duration-300 ease-out"
            style={{
              // FIXED: Use 50% for true center, then add the curve via calc
              left: '50%',
              top: `${finalY}px`,
              // This ensures the element is perfectly centered on its coordinates
              transform: `translate(calc(-50% + ${finalCurveOffset}px), -50%)`,
            }}
          >
            {index === 0 ? (
              <div className="relative">
                <HeaderNotecard
                  experience={experience}
                  onClick={() => onThumbtackClick(experience, index)}
                  rotation={rotation}
                />
                
                {/* Instruction text with camera icon */}
                <div
                  className="absolute top-full mt-12 left-[60%] flex items-start gap-2 select-none"
                  style={{
                    transform: 'translate(-50%, 0) rotate(-4deg)',
                  }}
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 mt-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className={`text-sm sm:text-base text-gray-600 ${indieFlower.className} leading-tight`}>
                    <p className="whitespace-nowrap">Point & Click to take Snapshots</p>
                    <p>of each Notecard!</p>
                  </div>
                </div>
              </div>
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