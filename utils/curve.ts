const CURVE_CONFIG = {
  amplitude: 150,
  frequency: 0.01,
  curveStrength: 1.5,
};

export const getCurveX = (y: number) => {
  const { amplitude, frequency, curveStrength } = CURVE_CONFIG;
  const sinValue = Math.sin((y-80) * frequency);
  const sign = Math.sign(sinValue);
  const absSin = Math.abs(sinValue);
  return amplitude * sign * (1 - Math.pow(1 - absSin, curveStrength));
};

export const getSpacing = () => {
  const { frequency } = CURVE_CONFIG;
  return Math.PI / frequency;
};