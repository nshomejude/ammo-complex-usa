import { Link } from "react-router-dom";
import { Shield, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-tactical" />
            <span className="text-xl font-bold tracking-tight">ARMS COMPLEX</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Ammo Categories
            </Link>
            <Link to="/firearms" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Firearms
            </Link>
            <Link to="/firearm-categories" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Firearm Types
            </Link>
            <Link to="/how-to-buy" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              How to Buy
            </Link>
            <Link to="/shipping" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Shipping
            </Link>
            <Link to="/firearms-license" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              License Info
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
