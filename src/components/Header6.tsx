import { Link } from "react-router-dom";
import { Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header6 = () => {
  return (
    <header className="sticky top-0 w-full z-50 shadow-md">
      <div className="bg-gradient-to-r from-[#CBB994] to-[#2E2E2E]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
            </Link>

            {/* Center Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Home</Link>
              <Link to="/products" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Products</Link>
              <Link to="/about" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">About</Link>
              <Link to="/training" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Training</Link>
              <Link to="/partners" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Partners</Link>
              <Link to="/contact" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Contact</Link>
            </nav>

            {/* Right CTA + Language */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-black">
                <Globe className="h-4 w-4 mr-2" /> EN
              </Button>
              <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Contact Sales</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
