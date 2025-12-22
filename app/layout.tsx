"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchDevice);
    };
    checkTouchDevice();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Check if mouse is within viewport
      const inViewport = 
        e.clientX >= 0 && 
        e.clientX <= window.innerWidth && 
        e.clientY >= 0 && 
        e.clientY <= window.innerHeight;
      setIsInViewport(inViewport);
    };

    const handleMouseEnter = () => {
      setIsInViewport(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if mouse actually left the viewport
      if (e.clientX < 0 || e.clientX > window.innerWidth || 
          e.clientY < 0 || e.clientY > window.innerHeight) {
        setIsInViewport(false);
      }
    };

    // Detect hover on clickable elements using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('[data-clickable="true"]') || target.closest('.cursor-pointer');
      setIsHovering(!!clickableElement);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      // Check if we're moving to another clickable element
      if (relatedTarget) {
        const clickableElement = relatedTarget.closest('[data-clickable="true"]') || relatedTarget.closest('.cursor-pointer');
        setIsHovering(!!clickableElement);
      } else {
        setIsHovering(false);
      }
    };

    const handleWindowMouseOut = (e: MouseEvent) => {
      // When mouse leaves the browser window entirely, relatedTarget is null
      if (!e.relatedTarget && (e.target as Node).nodeName === 'HTML') {
        setIsInViewport(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseout", handleWindowMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseout", handleWindowMouseOut);
    };
  }, []);

  const cursorClasses = `custom-cursor ${isHovering ? 'expanded' : ''} ${!isInViewport ? 'hidden' : ''} ${isTouchDevice ? 'hidden' : ''}`;

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isTouchDevice && (
          <div
            className={cursorClasses}
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          >
            <div className="corner-top-right" />
            <div className="corner-bottom-left" />
          </div>
        )}
        {children}
      </body>
    </html>
  );
}

