import { Link } from "react-router-dom";
import { Shield, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header4 = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#2E2E2E] shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-[#B0B0B0]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-6 text-xs text-[#B0B0B0]">
              <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> +1 (555) 123-4567</span>
              <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> sales@armscomplex.com</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-[#B0B0B0] hover:text-white">LinkedIn</a>
              <a href="#" className="text-xs text-[#B0B0B0] hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#CBB994]" />
            <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Get a Quote</Button>
        </div>
      </div>
    </header>
  );
};
