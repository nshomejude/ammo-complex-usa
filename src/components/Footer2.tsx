import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer2 = () => {
  return (
    <footer className="bg-[#2E2E2E] text-[#B0B0B0] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">SHOP</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/firearms" className="hover:text-white transition-colors">Firearms</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Ammunition</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">SUPPORT</h3>
            <ul className="space-y-2">
              <li><Link to="/how-to-buy" className="hover:text-white transition-colors">How to Buy</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/firearms-license" className="hover:text-white transition-colors">License Info</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">LEGAL</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">SUBSCRIBE</h3>
            <p className="text-sm mb-4">Get updates on new products and special offers</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-[#1a1a1a] border-[#556B2F] text-white" />
              <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#556B2F]/30 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-[#CBB994]" />
            <span className="font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
          </div>
          <p className="text-sm">© 2025 Arms Complex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
