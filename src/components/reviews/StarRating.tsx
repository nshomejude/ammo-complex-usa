import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  className
}: StarRatingProps) => {
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isPartiallyFilled = starRating > rating && starRating - 1 < rating;
        const fillPercentage = isPartiallyFilled ? ((rating % 1) * 100) : 0;

        return (
          <div
            key={index}
            className={cn(
              "relative",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
            onClick={() => handleClick(starRating)}
          >
            {isPartiallyFilled ? (
              <div className="relative">
                <Star
                  size={size}
                  className="text-muted"
                  fill="currentColor"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star
                    size={size}
                    className="text-yellow-500"
                    fill="currentColor"
                  />
                </div>
              </div>
            ) : (
              <Star
                size={size}
                className={isFilled ? "text-yellow-500" : "text-muted"}
                fill={isFilled ? "currentColor" : "none"}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
