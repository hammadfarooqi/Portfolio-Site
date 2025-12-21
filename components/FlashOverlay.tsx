"use client";

import { motion } from "framer-motion";

interface FlashOverlayProps {
  isVisible: boolean;
}

export default function FlashOverlay({ isVisible }: FlashOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.1 }}
    />
  );
}

