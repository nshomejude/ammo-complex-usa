import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-tactical" />
              <span className="text-xl font-bold tracking-tight">ARMS COMPLEX</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for premium ammunition and firearms since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Ammo Categories
                </Link>
              </li>
              <li>
                <Link to="/firearms" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Firearms
                </Link>
              </li>
              <li>
                <Link to="/firearm-categories" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Firearm Types
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-to-buy" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/firearms-license" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  License Info
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-tactical" />
                <span className="text-sm text-muted-foreground">info@armscomplex.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-tactical" />
                <span className="text-sm text-muted-foreground">1-800-FIREARMS</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-tactical" />
                <span className="text-sm text-muted-foreground">123 Liberty Street, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Arms Complex. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-tactical transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
            All firearms must be shipped to a valid FFL dealer. Ammunition sales subject to local and state laws.
          </p>
        </div>
      </div>
    </footer>
  );
};
