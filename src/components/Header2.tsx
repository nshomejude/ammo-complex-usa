import { Link } from "react-router-dom";
import { Shield, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Header2 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#2E2E2E] shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-20 relative">
          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-0">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
          </nav>

          {/* Center Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#CBB994]" />
            <span className="text-2xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          {/* Right Nav + CTA */}
          <nav className="hidden lg:flex items-center gap-8 absolute right-0">
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/partners" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Partners</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
            <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Shop Now</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
