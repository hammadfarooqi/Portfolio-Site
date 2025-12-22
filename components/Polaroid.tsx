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
}

export default function Polaroid({ experience, photo, position, rotation }: PolaroidProps) {
  return (
    <motion.div
      className="absolute z-10 bg-white p-4 pb-12 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `calc(${position.horizontal}px - 150px)`, // Center the 300px-wide polaroid horizontally
        width: "300px",
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
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
            src={photo.imageUrl}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="300px"
          />
        </motion.div>
      </div>
      <p className={`text-sm text-gray-700 ${kalam.className} text-center`}>
        {photo.caption}
      </p>
      <p className={`text-xs text-gray-500 ${kalam.className} text-center mt-1`}>
        {photo.longDescription}
      </p>
    </motion.div>
  );
}

