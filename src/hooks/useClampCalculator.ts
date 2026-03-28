import { useState, useMemo } from "react";
import { ClampInputs, Unit } from "../types/clamp";
import { calculateClamp } from "../lib/clampMath";

export const useClampCalculator = (initialInputs: ClampInputs) => {
  const [inputs, setInputs] = useState<ClampInputs>(initialInputs);

  const updateInput = (key: keyof Omit<ClampInputs, "units">, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateUnit = (key: keyof ClampInputs["units"], unit: Unit) => {
    setInputs((prev) => {
      const currentValue = prev[key];
      let newValue = currentValue;

      if (prev.units[key] !== unit) {
        if (unit === "rem") {
          // px -> rem
          newValue = Number((currentValue / prev.rootFontSize).toFixed(4));
        } else {
          // rem -> px
          newValue = Number((currentValue * prev.rootFontSize).toFixed(4));
        }
      }

      return {
        ...prev,
        [key]: newValue,
        units: { ...prev.units, [key]: unit },
      };
    });
  };

  const result = useMemo(() => calculateClamp(inputs), [inputs]);

  const reset = () => setInputs(initialInputs);

  return {
    inputs,
    updateInput,
    updateUnit,
    result,
    reset,
  };
};
