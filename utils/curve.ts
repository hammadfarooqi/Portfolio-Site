import { BREAKPOINTS, isMobileWidth } from "@/constants/breakpoints";

const CURVE_CONFIG = {
  amplitude: 150,
  mobileAmplitude: 110, // 50% of desktop amplitude for mobile
  frequency: 0.01,
  curveStrength: 1.5,
} as const;

export const getCurveX = (y: number, windowWidth: number): number => {
  const { amplitude, mobileAmplitude, frequency, curveStrength } = CURVE_CONFIG;
  // Use smaller amplitude on mobile (<= 768px)
  const currentAmplitude = isMobileWidth(windowWidth) ? mobileAmplitude : amplitude;
  const sinValue = Math.sin((y - 80) * frequency);
  const sign = Math.sign(sinValue);
  const absSin = Math.abs(sinValue);
  return currentAmplitude * sign * (1 - Math.pow(1 - absSin, curveStrength));
};

export const getSpacing = (): number => {
  const { frequency } = CURVE_CONFIG;
  return Math.PI / frequency;
};