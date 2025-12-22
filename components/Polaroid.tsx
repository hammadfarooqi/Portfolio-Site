"use client";

import { motion } from "framer-motion";
import { Photo, Experience } from "@/data/experiences";
import Image from "next/image";
import { Kalam } from "next/font/google";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});

interface PolaroidProps {
  experience: Experience;
  photo: Photo;
  position: { top: number; horizontal: number };
  rotation: number;
  windowWidth: number;
}

export default function Polaroid({ experience, photo, position, rotation, windowWidth }: PolaroidProps) {
  const isMobile = windowWidth <= 768;
  const polaroidWidth = isMobile ? 200 : 300;
  const offsetX = isMobile ? 100 : 150;
  
  return (
    <motion.div
      className="absolute z-10 bg-white p-3 pb-8 md:p-4 md:pb-12 shadow-lg w-[200px] md:w-[300px]"
      style={{
        top: `${position.top}px`,
        left: `calc(${position.horizontal}px - ${offsetX}px)`, // Center the polaroid horizontally
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-[170px] md:h-64 mb-2 overflow-hidden bg-white">
        <motion.div
          className="relative w-full h-full"
          initial={{ filter: "blur(20px) brightness(2)" }}
          animate={{ filter: "blur(0px) brightness(1)" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src={photo.imageUrl}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 200px, 300px"
          />
        </motion.div>
      </div>
      <p className={`text-xs md:text-sm text-gray-700 ${kalam.className} text-center`}>
        {photo.caption}
      </p>
      <p className={`text-[10px] md:text-xs text-gray-500 ${kalam.className} text-center mt-1`}>
        {photo.longDescription}
      </p>
    </motion.div>
  );
}

