import { Link } from "react-router-dom";
import { Shield, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header6 = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 shadow-md">
      <div className="bg-gradient-to-r from-[#CBB994] to-[#2E2E2E]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
            </Link>

            {/* Center Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Home</Link>
              <Link to="/products" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Products</Link>
              <Link to="/about" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">About</Link>
              <Link to="/training" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Training</Link>
              <Link to="/partners" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Partners</Link>
              <Link to="/contact" className="text-sm font-medium text-white hover:text-black transition-all hover:scale-105">Contact</Link>
            </nav>

            {/* Right CTA + Language */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-black hidden md:flex">
                <Globe className="h-4 w-4 mr-2" /> EN
              </Button>
              <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white hidden md:flex">Contact Sales</Button>

              {/* Mobile Menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-black lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-[#CBB994] to-[#2E2E2E]">
                  <nav className="flex flex-col gap-6 mt-8">
                    <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">Home</Link>
                    <Link to="/products" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">Products</Link>
                    <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">About</Link>
                    <Link to="/training" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">Training</Link>
                    <Link to="/partners" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">Partners</Link>
                    <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-black transition-colors">Contact</Link>
                    <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white w-full">Contact Sales</Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
