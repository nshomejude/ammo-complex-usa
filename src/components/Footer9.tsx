import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer9 = () => {
  return (
    <footer className="bg-[#2E2E2E] text-[#B0B0B0] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-7 w-7 text-[#CBB994]" />
              <span className="text-xl font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
            </div>
            <p className="text-sm">Professional firearms and tactical equipment supplier.</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">PRODUCTS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/firearms" className="hover:text-white transition-colors">Firearms</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Ammunition</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/firearms-license" className="hover:text-white transition-colors">License Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">NEWSLETTER</h3>
            <p className="text-sm mb-3">Stay informed about new arrivals</p>
            <Input 
              placeholder="Your email" 
              className="bg-[#1a1a1a] border-[#556B2F] text-white mb-2 placeholder:text-[#B0B0B0]" 
            />
            <Button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Subscribe</Button>
          </div>
        </div>

        <div className="h-px bg-[#556B2F]/30 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 Arms Complex. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
