import { GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useComparison } from "@/hooks/useComparison";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ComparisonButtonProps {
  productId: string;
  productName: string;
  variant?: "button" | "checkbox";
  className?: string;
}

export const ComparisonButton = ({ 
  productId, 
  productName, 
  variant = "button",
  className 
}: ComparisonButtonProps) => {
  const { isInComparison, toggleComparison, canAddMore, maxComparison, comparisonCount } = useComparison();
  const inComparison = isInComparison(productId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const success = toggleComparison(productId);
    
    if (!success && !inComparison) {
      toast.error(`Maximum ${maxComparison} products can be compared`);
    } else if (inComparison) {
      toast.success("Removed from comparison");
    } else {
      toast.success(`Added to comparison (${comparisonCount + 1}/${maxComparison})`);
    }
  };

  if (variant === "checkbox") {
    return (
      <div 
        className={cn("flex items-center space-x-2", className)}
        onClick={handleToggle}
      >
        <Checkbox 
          checked={inComparison}
          disabled={!inComparison && !canAddMore}
          id={`compare-${productId}`}
        />
        <label
          htmlFor={`compare-${productId}`}
          className="text-sm cursor-pointer select-none"
        >
          Compare
        </label>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      variant={inComparison ? "default" : "outline"}
      onClick={handleToggle}
      disabled={!inComparison && !canAddMore}
      className={className}
    >
      <GitCompare className="h-4 w-4 mr-2" />
      {inComparison ? "Comparing" : "Compare"}
    </Button>
  );
};
