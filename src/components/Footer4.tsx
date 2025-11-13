import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer4 = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <span className="text-3xl font-bold font-['Oswald']">ARMS COMPLEX</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          <Link to="/" className="text-sm hover:text-[#CBB994] transition-colors">Home</Link>
          <Link to="/products" className="text-sm hover:text-[#CBB994] transition-colors">Products</Link>
          <Link to="/firearms" className="text-sm hover:text-[#CBB994] transition-colors">Firearms</Link>
          <Link to="/about" className="text-sm hover:text-[#CBB994] transition-colors">About</Link>
          <Link to="/training" className="text-sm hover:text-[#CBB994] transition-colors">Training</Link>
          <Link to="/contact" className="text-sm hover:text-[#CBB994] transition-colors">Contact</Link>
        </nav>

        <div className="max-w-md mx-auto mb-8">
          <h3 className="text-center text-lg font-bold mb-4 font-['Oswald']">STAY UPDATED</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter your email" 
              className="bg-[#2E2E2E] border-[#556B2F] text-white" 
            />
            <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">Subscribe</Button>
          </div>
        </div>

        <div className="border-t border-[#2E2E2E] pt-6 text-center text-sm text-[#B0B0B0]">
          <p>© 2025 Arms Complex. All rights reserved. Licensed Firearms Dealer.</p>
        </div>
      </div>
    </footer>
  );
};
