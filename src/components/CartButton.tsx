import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  className?: string;
}

export const CartButton = ({ className }: CartButtonProps) => {
  const { cartCount } = useCart();

  return (
    <Link to="/cart">
      <Button
        size="icon"
        variant="ghost"
        className={cn("relative", className)}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </Button>
    </Link>
  );
};
