import { Link } from "react-router-dom";
import { Shield, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer11 = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#2E2E2E] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-[#CBB994]" />
            <span className="text-3xl font-bold font-['Oswald']">ARMS COMPLEX</span>
          </div>

          <p className="text-[#B0B0B0] mb-6 max-w-2xl mx-auto">
            Professional firearms, ammunition, and tactical equipment. Serving military, law enforcement, and civilian markets worldwide.
          </p>

          <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <Link to="/" className="hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/firearms" className="hover:text-[#CBB994] transition-colors">Firearms</Link>
            <Link to="/about" className="hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="hover:text-[#CBB994] transition-colors">Contact</Link>
            <Link to="/shipping" className="hover:text-[#CBB994] transition-colors">Shipping</Link>
            <Link to="/firearms-license" className="hover:text-[#CBB994] transition-colors">License Info</Link>
          </nav>

          <div className="border-t border-[#556B2F]/30 pt-6">
            <p className="text-sm text-[#B0B0B0]">© 2025 Arms Complex. Licensed Firearms Dealer FFL #12-34567. All rights reserved.</p>
          </div>
        </div>

        <Button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg-[#556B2F] hover:bg-[#556B2F]/90 shadow-2xl transition-all hover:scale-110 z-50"
          size="icon"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      </div>
    </footer>
  );
};
