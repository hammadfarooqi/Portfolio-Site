"use client";

import { motion } from "framer-motion";
import { Experience } from "@/data/experiences";
import Image from "next/image";

interface PolaroidProps {
  experience: Experience;
  position: { top: number; left: number };
}

export default function Polaroid({ experience, position }: PolaroidProps) {
  return (
    <motion.div
      className="absolute bg-white p-4 pb-12 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "300px",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-64 mb-2 overflow-hidden bg-white">
        <motion.div
          className="relative w-full h-full"
          initial={{ filter: "blur(20px) brightness(2)" }}
          animate={{ filter: "blur(0px) brightness(1)" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="300px"
          />
        </motion.div>
      </div>
      <p className="text-sm text-gray-700 font-handwritten text-center">
        {experience.caption}
      </p>
      <p className="text-xs text-gray-500 font-handwritten text-center mt-1">
        {experience.description}
      </p>
    </motion.div>
  );
}

