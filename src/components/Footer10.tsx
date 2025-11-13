import { Link } from "react-router-dom";
import { Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer10 = () => {
  return (
    <footer className="bg-[#2E2E2E] text-[#B0B0B0]">
      {/* Gradient top edge */}
      <div className="h-1 bg-gradient-to-r from-[#556B2F] via-[#CBB994] to-[#556B2F]"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-[#CBB994]" />
              <span className="text-lg font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
            </div>
            <p className="text-sm">Leading provider of professional firearms, ammunition, and tactical solutions worldwide.</p>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">QUICK ACCESS</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <Link to="/firearms" className="hover:text-white transition-colors">Firearms</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">FOLLOW US</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#556B2F] rounded-full flex items-center justify-center hover:bg-[#556B2F]/80 transition-all hover:scale-110 hover:-translate-y-1">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#556B2F] rounded-full flex items-center justify-center hover:bg-[#556B2F]/80 transition-all hover:scale-110 hover:-translate-y-1">
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#556B2F] rounded-full flex items-center justify-center hover:bg-[#556B2F]/80 transition-all hover:scale-110 hover:-translate-y-1">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#556B2F] rounded-full flex items-center justify-center hover:bg-[#556B2F]/80 transition-all hover:scale-110 hover:-translate-y-1">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#556B2F]/30 pt-6 text-center text-sm">
          <p>© 2025 Arms Complex. Licensed & Insured Firearms Dealer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
