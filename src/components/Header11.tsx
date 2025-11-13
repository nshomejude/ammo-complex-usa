import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header11 = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#2E2E2E] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#CBB994]" />
            <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">Home</Link>
            <Link to="/products" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">Products</Link>
            <Link to="/about" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">About</Link>
            <Link to="/training" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">Training</Link>
            <Link to="/partners" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">Partners</Link>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white hover:bg-[#556B2F] rounded transition-all hover:scale-105 hover:-translate-y-1">Contact</Link>
          </nav>

          <Button className="bg-[#CBB994] hover:bg-[#CBB994]/90 text-black font-semibold">Join Our Network</Button>
        </div>
      </div>
    </header>
  );
};
