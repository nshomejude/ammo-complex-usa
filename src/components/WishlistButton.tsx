import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "default" | "icon";
  className?: string;
}

export const WishlistButton = ({ 
  productId, 
  productName, 
  variant = "default",
  className 
}: WishlistButtonProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    
    if (inWishlist) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  if (variant === "icon") {
    return (
      <Button
        size="icon"
        variant="ghost"
        onClick={handleClick}
        className={cn(
          "h-8 w-8 hover:bg-background/80",
          className
        )}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          className={cn(
            "h-4 w-4 transition-all",
            inWishlist && "fill-destructive text-destructive"
          )} 
        />
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant={inWishlist ? "default" : "outline"}
      onClick={handleClick}
      className={className}
    >
      <Heart 
        className={cn(
          "h-4 w-4 mr-2",
          inWishlist && "fill-current"
        )} 
      />
      {inWishlist ? "Saved" : "Save"}
    </Button>
  );
};
