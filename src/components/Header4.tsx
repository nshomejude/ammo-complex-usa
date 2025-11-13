import { Link } from "react-router-dom";
import { Shield, Phone, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header4 = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#2E2E2E] shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-[#B0B0B0]/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-6 text-xs text-[#B0B0B0]">
              <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> +1 (555) 123-4567</span>
              <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> sales@armscomplex.com</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-[#B0B0B0] hover:text-white">LinkedIn</a>
              <a href="#" className="text-xs text-[#B0B0B0] hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#CBB994]" />
            <span className="text-xl font-bold text-white tracking-tight font-['Oswald']">ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white hidden md:flex">Get a Quote</Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#2E2E2E]">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
                  <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
                  <Link to="/training" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
                  <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
                  <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white w-full">Get a Quote</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
