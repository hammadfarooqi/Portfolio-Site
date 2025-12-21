"use client";

import { Experience } from "@/data/experiences";

interface TimelineProps {
  experiences: Experience[];
  onThumbtackClick: (experience: Experience, index: number) => void;
}

export default function Timeline({ experiences, onThumbtackClick }: TimelineProps) {
  return (
    <div className="relative flex flex-col items-center min-h-screen py-20">
      {/* Vertical dashed line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-400 transform -translate-x-1/2" />
      
      {/* Thumbtacks */}
      {experiences.map((experience, index) => {
        const spacing = 200; // Space between thumbtacks
        
        return (
          <div
            key={index}
            className="relative z-10 flex items-center gap-8 cursor-pointer group"
            style={{ marginTop: index === 0 ? 0 : spacing }}
            onClick={() => onThumbtackClick(experience, index)}
          >
            {/* Thumbtack icon */}
            <div className="relative">
              <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-800 group-hover:scale-110 transition-transform" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800" />
            </div>
            
            {/* Title and date */}
            <div className="flex flex-col">
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

