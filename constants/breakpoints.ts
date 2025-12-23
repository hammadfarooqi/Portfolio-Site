/**
 * Breakpoint constants used across the application for responsive design
 */

export const BREAKPOINTS = {
  MOBILE: 768,
  WIDE_SCREEN: 1152,
} as const;

/**
 * Helper function to check if current width is mobile
 */
export const isMobileWidth = (width: number): boolean => width <= BREAKPOINTS.MOBILE;

/**
 * Helper function to check if current width is wide screen
 */
export const isWideScreen = (width: number): boolean => width >= BREAKPOINTS.WIDE_SCREEN;

