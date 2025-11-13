import { Link } from "react-router-dom";
import { Shield, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Shield className="h-6 w-6 text-tactical" />
            <span className="text-xl font-bold tracking-tight">ARMS COMPLEX</span>
          </Link>
          
          <div className="flex-1 max-w-xl mx-4">
            <Search />
          </div>
          
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                Landing Pages <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full cursor-pointer">Home (Original)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home2" className="w-full cursor-pointer">Home 2 - Tactical Precision</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home3" className="w-full cursor-pointer">Home 3 - Defense & Security</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home4" className="w-full cursor-pointer">Home 4 - Hunter's Edge</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home5" className="w-full cursor-pointer">Home 5 - Engineering</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home6" className="w-full cursor-pointer">Home 6 - Global Distribution</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home7" className="w-full cursor-pointer">Home 7 - Custom Manufacturing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home8" className="w-full cursor-pointer">Home 8 - Safety & Training</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home9" className="w-full cursor-pointer">Home 9 - About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home10" className="w-full cursor-pointer">Home 10 - Technology</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home11" className="w-full cursor-pointer">Home 11 - Wholesale</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

          <div className="flex items-center gap-3 flex-shrink-0">
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
