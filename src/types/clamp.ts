export type Unit = "px" | "rem";

export interface ClampInputs {
  minViewport: number;
  maxViewport: number;
  minFontSize: number;
  maxFontSize: number;
  rootFontSize: number;
  units: Record<keyof Omit<ClampInputs, "units" | "rootFontSize">, Unit>;
}

export interface ClampResult {
  clampString: string;
  slope: number;
  intercept: number;
  isValid: boolean;
  error?: string;
}
