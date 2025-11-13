import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer5 = () => {
  return (
    <footer className="bg-gradient-to-r from-[#B0B0B0] via-[#2E2E2E] to-[#B0B0B0] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#CBB994]" />
            <span className="font-bold font-['Oswald']">ARMS COMPLEX</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="hover:text-[#CBB994] transition-colors">Home</Link>
            <span className="text-[#556B2F]">|</span>
            <Link to="/products" className="hover:text-[#CBB994] transition-colors">Products</Link>
            <span className="text-[#556B2F]">|</span>
            <Link to="/about" className="hover:text-[#CBB994] transition-colors">About</Link>
            <span className="text-[#556B2F]">|</span>
            <Link to="/contact" className="hover:text-[#CBB994] transition-colors">Contact</Link>
            <span className="text-[#556B2F]">|</span>
            <Link to="#" className="hover:text-[#CBB994] transition-colors">Privacy</Link>
          </nav>

          <p className="text-sm text-[#B0B0B0]">© 2025 Arms Complex</p>
        </div>
      </div>
    </footer>
  );
};
