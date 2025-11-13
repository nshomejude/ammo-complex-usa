import { Link } from "react-router-dom";
import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export const Header9 = () => {
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setExpanded(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent transition-all duration-300 ${expanded ? 'h-24' : 'h-16 bg-black/90'}`}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" />
            <span className={`font-bold text-white tracking-tight font-['Oswald'] transition-all ${expanded ? 'text-2xl' : 'text-xl'}`}>ARMS COMPLEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
            <Link to="/training" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="bg-white hover:bg-white/90 text-black hidden md:flex">Start Shopping</Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#CBB994] lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black/95">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link to="/" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Products</Link>
                  <Link to="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">About</Link>
                  <Link to="/training" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Training</Link>
                  <Link to="/contact" onClick={() => setOpen(false)} className="text-lg font-medium text-white hover:text-[#CBB994] transition-colors">Contact</Link>
                  <Button className="bg-white hover:bg-white/90 text-black w-full">Start Shopping</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
