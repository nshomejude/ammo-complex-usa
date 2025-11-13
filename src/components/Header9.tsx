import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Header9 = () => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => setExpanded(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent transition-all duration-300 ${expanded ? 'h-24' : 'h-16 bg-black/90'}`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" />
            <span className={`font-bold text-white tracking-tight font-['Oswald'] transition-all ${expanded ? 'text-2xl' : 'text-xl'}`}>ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <Button className="bg-white hover:bg-white/90 text-black">Start Shopping</Button>
        </div>
      </div>
    </header>
  );
};
