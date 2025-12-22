"use client";

import { memo } from "react";
import { Experience } from "@/data/experiences";

interface NotecardProps {
  experience: Experience;
  onClick: () => void;
  rotation?: number;
}

function Notecard({ experience, onClick, rotation = 0 }: NotecardProps) {
  // Truncate shortDescription if too long
  const maxDescriptionLength = 100;
  const truncatedDescription = 
    experience.shortDescription.length > maxDescriptionLength
      ? experience.shortDescription.substring(0, maxDescriptionLength) + "..."
      : experience.shortDescription;

  return (
    <div
      className="relative cursor-pointer group"
      data-clickable="true"
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Tape pieces at corners */}
      <div className="absolute -top-2 -left-2 w-8 h-6 bg-gray-200/60 rotate-[-15deg] z-10" />
      <div className="absolute -top-2 -right-2 w-8 h-6 bg-gray-200/60 rotate-[15deg] z-10" />
      
      {/* Notecard */}
      <div className="relative bg-[#FFFEF7] w-[220px] p-4 shadow-md group-hover:shadow-lg transition-shadow border border-gray-200/50">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
          {experience.title}
        </h3>
        
        {/* Date */}
        <p className="text-xs text-gray-500 mb-2">{experience.date}</p>
        
        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
          {truncatedDescription}
        </p>
      </div>
    </div>
  );
}

export default memo(Notecard);

