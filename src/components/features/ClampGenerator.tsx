"use client";

import { useClampCalculator } from "../../hooks/useClampCalculator";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CodePreview } from "./CodePreview";
import { RefreshCcw, Settings2 } from "lucide-react";
import { motion } from "motion/react";
import { ClampInputs } from "../../types/clamp";

export const INITIAL_INPUTS: ClampInputs = {
  minViewport: 576,
  maxViewport: 1024,
  minFontSize: 16,
  maxFontSize: 48,
  rootFontSize: 16,
  units: {
    minViewport: "px",
    maxViewport: "px",
    minFontSize: "px",
    maxFontSize: "px",
  },
};

export const ClampGenerator = () => {
  const { inputs, updateInput, updateUnit, result, reset } = useClampCalculator(INITIAL_INPUTS);

  const handleInputChange = (key: keyof Omit<ClampInputs, "units">, val: string) => {
    const num = parseFloat(val);
    updateInput(key, isNaN(num) ? 0 : num);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 w-full">
      <div

        className="w-full max-w-3xl"
      >
        <header className="mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
            Font-size Clamp Generator
          </h1>
          <p className="text-zinc-300 text-sm font-medium">
            Generate linearly scale font-size with clamp()
          </p>
        </header>

        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-8">
              <Input
                label="Minimum viewport width"
                unit={inputs.units.minViewport}
                onUnitChange={(u) => updateUnit("minViewport", u)}
                type="number"
                value={inputs.minViewport || ""}
                onChange={(e) => handleInputChange("minViewport", e.target.value)}
              />
              <Input
                label="Minimum font size"
                unit={inputs.units.minFontSize}
                onUnitChange={(u) => updateUnit("minFontSize", u)}
                type="number"
                value={inputs.minFontSize || ""}
                onChange={(e) => handleInputChange("minFontSize", e.target.value)}
              />
            </div>

            <div className="space-y-8">
              <Input
                label="Maximum viewport width"
                unit={inputs.units.maxViewport}
                onUnitChange={(u) => updateUnit("maxViewport", u)}
                type="number"
                value={inputs.maxViewport || ""}
                onChange={(e) => handleInputChange("maxViewport", e.target.value)}
              />
              <Input
                label="Maximum font size"
                unit={inputs.units.maxFontSize}
                onUnitChange={(u) => updateUnit("maxFontSize", u)}
                type="number"
                value={inputs.maxFontSize || ""}
                onChange={(e) => handleInputChange("maxFontSize", e.target.value)}
              />
            </div>
          </div>

          <CodePreview code={result.clampString} isValid={result.isValid} />

          <div className="flex flex-col items-center gap-6">
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              Calculation based on a root font-size of
              <span className="relative inline-block">
                <input
                  type="number"
                  value={inputs.rootFontSize}
                  onChange={(e) => handleInputChange("rootFontSize", e.target.value)}
                  className="bg-transparent border-b border-zinc-700 w-8 text-center outline-none focus:border-zinc-400 transition-colors font-bold text-zinc-400"
                />
              </span>
              pixel.
            </p>

            <Button
              variant="ghost"
              onClick={reset}
              className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100"
            >
              Reset to default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
