import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer8 = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#2E2E2E] to-[#CBB994]"></div>
      
      {/* Large watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Shield className="h-96 w-96 text-white" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">NAVIGATION</h3>
            <ul className="space-y-2 text-[#B0B0B0] text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/firearms" className="hover:text-white transition-colors">Firearms</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">SUPPORT</h3>
            <ul className="space-y-2 text-[#B0B0B0] text-sm">
              <li><Link to="/how-to-buy" className="hover:text-white transition-colors">How to Buy</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/firearms-license" className="hover:text-white transition-colors">License Info</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">GET HELP</h3>
            <p className="text-[#B0B0B0] text-sm mb-4">Need assistance? Our team is here to help.</p>
            <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Contact Support</Button>
          </div>
        </div>

        <div className="border-t border-[#556B2F]/30 pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-[#CBB994]" />
            <span className="font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
          </div>
          <p className="text-[#B0B0B0] text-sm">© 2025 Arms Complex. Licensed Firearms Dealer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
