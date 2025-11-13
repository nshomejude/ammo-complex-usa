import { Link } from "react-router-dom";
import { Shield, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer3 = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#2E2E2E] text-[#B0B0B0] py-8">
      <div className="h-1 bg-gradient-to-r from-transparent via-[#556B2F] to-transparent mb-8"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-8 w-8 text-[#CBB994]" />
              <span className="text-2xl font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
            </div>
            <p className="text-sm max-w-sm">Your trusted partner in defense and tactical solutions. Quality, reliability, and service excellence.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">QUICK LINKS</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link>
              <Link to="/firearms-license" className="hover:text-white transition-colors">License</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#556B2F]/30 pt-6 text-center text-sm">
          <p>© 2025 Arms Complex. All rights reserved.</p>
        </div>
      </div>

      {/* Floating Back to Top */}
      <Button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-[#556B2F] hover:bg-[#556B2F]/90 shadow-lg z-40"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
};
