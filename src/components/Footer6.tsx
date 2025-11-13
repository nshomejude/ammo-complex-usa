import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

export const Footer6 = () => {
  return (
    <footer className="bg-[#556B2F] text-[#CBB994] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">CONTACT</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@armscomplex.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Virginia, USA</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">Shop Products</Link></li>
              <li><Link to="/firearms" className="hover:text-white transition-colors">Firearms</Link></li>
              <li><Link to="/how-to-buy" className="hover:text-white transition-colors">How to Buy</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-white font-bold mb-4 font-['Oswald']">PARTNERS</h3>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#2E2E2E] rounded flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#CBB994]" />
              </div>
              <div className="w-12 h-12 bg-[#2E2E2E] rounded flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#CBB994]" />
              </div>
              <div className="w-12 h-12 bg-[#2E2E2E] rounded flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#CBB994]" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#CBB994]/30 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-white" />
            <span className="font-bold text-white font-['Oswald']">ARMS COMPLEX</span>
          </div>
          <p className="text-sm">© 2025 Arms Complex. Authorized Dealer.</p>
        </div>
      </div>
    </footer>
  );
};
