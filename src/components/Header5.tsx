import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header5 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-black shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#B0B0B0]" />
            <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-[#B0B0B0]"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Slide-down Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-[#B0B0B0]/20 animate-fade-in">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">Home</Link>
              <Link to="/products" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">Products</Link>
              <Link to="/about" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">About</Link>
              <Link to="/training" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">Training</Link>
              <Link to="/partners" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">Partners</Link>
              <Link to="/contact" className="text-lg font-medium text-white hover:text-[#B0B0B0] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B0B0B0] hover:after:w-full after:transition-all">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
