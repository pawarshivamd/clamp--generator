import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/Button";

interface CodePreviewProps {
  code: string;
  isValid: boolean;
}

export const CodePreview = ({ code, isValid }: CodePreviewProps) => {
  const [copied, setCopied] = useState(false);
  const fullCode = `font-size: ${code};`;

  const handleCopy = async () => {
    if (!isValid) return;
    await navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 w-full">
      <div 
        onClick={handleCopy}
        className={`group relative p-4 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-between ${
          isValid 
            ? "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 shadow-lg" 
            : "bg-zinc-900/50 border-red-900/30 opacity-50"
        }`}
      >
        <code className="block font-mono text-sm sm:text-base text-zinc-100 break-all leading-relaxed">
          {isValid ? (
            <>
              <span className="text-zinc-400">font-size:</span> {code};
            </>
          ) : (
            "Invalid inputs. Please check your values."
          )}
        </code>
        
        <div className="flex items-center gap-2 ml-4">
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          )}
        </div>

        {copied && (
          <div className="absolute -top-8 right-0 bg-green-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-1">
            Copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
};
