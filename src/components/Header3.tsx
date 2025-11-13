import { Link } from "react-router-dom";
import { Shield, ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header3 = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#556B2F] border-b-2 border-[#B0B0B0]/30 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#CBB994]" />
            <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/partners" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Partners</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] hidden md:flex">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#556B2F]">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
                  <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
                  <Link to="/training" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
                  <Link to="/partners" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Partners</Link>
                  <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
