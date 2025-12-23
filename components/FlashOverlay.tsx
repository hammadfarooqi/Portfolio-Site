"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FlashOverlayProps {
  isVisible: boolean;
  duration: number;
}

export default function FlashOverlay({ isVisible, duration }: FlashOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-white z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        />
      )}
    </AnimatePresence>
  );
}

