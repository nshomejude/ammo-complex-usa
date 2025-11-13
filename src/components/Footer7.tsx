import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer7 = () => {
  return (
    <footer className="bg-[#B0B0B0] text-[#2E2E2E] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#556B2F]" />
            <span className="text-xl font-bold font-['Oswald']">ARMS COMPLEX</span>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-[#556B2F] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#556B2F] transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-[#556B2F] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#556B2F] transition-colors">Contact</Link>
          </nav>

          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-[#556B2F] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#556B2F] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#556B2F] transition-colors">Instagram</a>
          </div>
        </div>

        <div className="text-center mt-6 text-sm">
          <p>© 2025 Arms Complex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
