import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/hooks/useComparison";
import { cn } from "@/lib/utils";

interface ComparisonBarProps {
  onCompare: () => void;
}

export const ComparisonBar = ({ onCompare }: ComparisonBarProps) => {
  const { comparisonCount, clearComparison, maxComparison } = useComparison();

  if (comparisonCount === 0) return null;

  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
      "bg-card border border-border rounded-full shadow-2xl",
      "px-6 py-3 flex items-center gap-4",
      "animate-slide-in-right backdrop-blur-xl"
    )}>
      <div className="flex items-center gap-2">
        <GitCompare className="h-5 w-5 text-primary" />
        <span className="font-semibold">
          {comparisonCount} of {maxComparison} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm"
          onClick={onCompare}
          disabled={comparisonCount < 2}
        >
          Compare Now
        </Button>
        
        <Button 
          size="sm"
          variant="ghost"
          onClick={clearComparison}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
