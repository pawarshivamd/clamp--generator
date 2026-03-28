import { ClampInputs, ClampResult, Unit } from "../types/clamp";

const toPx = (value: number, unit: Unit, rootFontSize: number) => {
  return unit === "rem" ? value * rootFontSize : value;
};

const formatValue = (value: number) => {
  return parseFloat(value.toFixed(4)).toString();
};

export const calculateClamp = (params: ClampInputs): ClampResult => {
  const { minViewport, maxViewport, minFontSize, maxFontSize, rootFontSize, units } = params;

  // Convert all inputs to PX for calculation
  const minVpPx = toPx(minViewport, units.minViewport, rootFontSize);
  const maxVpPx = toPx(maxViewport, units.maxViewport, rootFontSize);
  const minFsPx = toPx(minFontSize, units.minFontSize, rootFontSize);
  const maxFsPx = toPx(maxFontSize, units.maxFontSize, rootFontSize);

  // Validation
  if (minVpPx <= 0 || maxVpPx <= 0 || minFsPx <= 0 || maxFsPx <= 0 || rootFontSize <= 0) {
    return { clampString: "", slope: 0, intercept: 0, isValid: false, error: "All values must be positive numbers." };
  }

  if (minVpPx === maxVpPx) {
    return { clampString: "", slope: 0, intercept: 0, isValid: false, error: "Viewport widths cannot be equal." };
  }

  // Math Logic
  const slope = (maxFsPx - minFsPx) / (maxVpPx - minVpPx);
  const intercept = minFsPx - slope * minVpPx;

  // Convert to rem for output
  const minFontSizeRem = formatValue(minFsPx / rootFontSize);
  const maxFontSizeRem = formatValue(maxFsPx / rootFontSize);
  const interceptRem = formatValue(intercept / rootFontSize);
  const slopeVw = formatValue(slope * 100);

  const clampString = `clamp(${minFontSizeRem}rem, ${interceptRem}rem + ${slopeVw}vw, ${maxFontSizeRem}rem)`;

  return {
    clampString,
    slope,
    intercept,
    isValid: true,
  };
};
