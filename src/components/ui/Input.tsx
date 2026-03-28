import React from "react";
import { Unit } from "../../types/clamp";
import { ChevronDown } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: Unit;
  onUnitChange?: (unit: Unit) => void;
}

export const Input: React.FC<InputProps> = ({ label, unit, onUnitChange, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group flex items-center">
        <input
          {...props}
          className={`w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-600 transition-all placeholder:text-zinc-600 font-medium ${className || ""}`}
        />
        {onUnitChange && (
          <div className="absolute right-2 flex items-center">
            <div className="relative">
              <select
                value={unit}
                onChange={(e) => onUnitChange(e.target.value as Unit)}
                className="appearance-none bg-transparent text-xs font-bold text-zinc-100 hover:text-white px-2 py-1 pr-6 outline-none cursor-pointer transition-colors uppercase tracking-tight"
              >
                <option value="px" className="bg-zinc-900 text-white">PX</option>
                <option value="rem" className="bg-zinc-900 text-white">REM</option>
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        )}
        {!onUnitChange && props.placeholder === "PX" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 uppercase">
            PX
          </span>
        )}
      </div>
    </div>
  );
};
