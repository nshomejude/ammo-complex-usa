import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header10 = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-gradient-to-r from-[#556B2F] via-[#2E2E2E] to-[#556B2F] shadow-lg">
      <div className="border-t-4 border-[#CBB994]"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-6">
          {/* Center Logo with borders */}
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#CBB994]"></div>
            <Shield className="h-10 w-10 text-[#CBB994]" />
            <span className="text-3xl font-bold text-white tracking-wider font-['Oswald']">ARMS COMPLEX</span>
            <Shield className="h-10 w-10 text-[#CBB994]" />
            <div className="h-px w-12 bg-[#CBB994]"></div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">Training</Link>
            <Link to="/partners" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">Partners</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-all hover:-translate-y-0.5">Contact</Link>
          </nav>
        </div>
      </div>
      <div className="border-b-4 border-[#CBB994]"></div>
    </header>
  );
};
