import { Link } from "react-router-dom";
import { Shield, Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header8 = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#2E2E2E]/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-6">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Shield className="h-5 w-5 text-[#CBB994]" />
            <span className="text-lg font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-xs font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-xs font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-xs font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-xs font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-xs font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-black/30 rounded px-3 py-1">
              <Search className="h-4 w-4 text-[#B0B0B0]" />
              <Input 
                placeholder="Search..." 
                className="border-0 bg-transparent text-white text-sm h-6 w-32 focus-visible:ring-0"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] h-8 w-8">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] h-8 w-8">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
