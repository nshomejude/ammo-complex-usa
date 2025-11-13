import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header7 = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#2E2E2E] shadow-xl border-b border-[#556B2F]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Large Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-[#556B2F] rounded">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          {/* Balanced Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-6">Contact Us</Button>
        </div>
      </div>
    </header>
  );
};
