import { Link } from "react-router-dom";
import { Shield, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const landingPages = [
    { path: "/", label: "Home (Original)" },
    { path: "/home2", label: "Home 2 - Tactical Precision" },
    { path: "/home3", label: "Home 3 - Defense & Security" },
    { path: "/home4", label: "Home 4 - Hunter's Edge" },
    { path: "/home5", label: "Home 5 - Engineering" },
    { path: "/home6", label: "Home 6 - Global Distribution" },
    { path: "/home7", label: "Home 7 - Custom Manufacturing" },
    { path: "/home8", label: "Home 8 - Safety & Training" },
    { path: "/home9", label: "Home 9 - About Us" },
    { path: "/home10", label: "Home 10 - Technology" },
    { path: "/home11", label: "Home 11 - Wholesale" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Shield className="h-6 w-6 text-tactical" />
            <span className="text-xl font-bold tracking-tight">ARMS COMPLEX</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <Search />
          </div>
          
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                Landing Pages <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full cursor-pointer">Home (Original)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home2" className="w-full cursor-pointer">Home 2 - Tactical Precision</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home3" className="w-full cursor-pointer">Home 3 - Defense & Security</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home4" className="w-full cursor-pointer">Home 4 - Hunter's Edge</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home5" className="w-full cursor-pointer">Home 5 - Engineering</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home6" className="w-full cursor-pointer">Home 6 - Global Distribution</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home7" className="w-full cursor-pointer">Home 7 - Custom Manufacturing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home8" className="w-full cursor-pointer">Home 8 - Safety & Training</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home9" className="w-full cursor-pointer">Home 9 - About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home10" className="w-full cursor-pointer">Home 10 - Technology</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home11" className="w-full cursor-pointer">Home 11 - Wholesale</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/products" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Ammo Categories
            </Link>
            <Link to="/firearms" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Firearms
            </Link>
            <Link to="/firearm-categories" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Firearm Types
            </Link>
            <Link to="/how-to-buy" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              How to Buy
            </Link>
            <Link to="/shipping" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Shipping
            </Link>
            <Link to="/firearms-license" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              License Info
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Admin
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <div className="flex flex-col gap-6 mt-8">
                <div className="mb-4">
                  <Search />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="landing-pages">
                    <AccordionTrigger className="text-base font-semibold">
                      Landing Pages
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {landingPages.map((page) => (
                          <Link
                            key={page.path}
                            to={page.path}
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm hover:text-tactical transition-colors"
                          >
                            {page.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Products
                </Link>
                
                <Link
                  to="/categories"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Ammo Categories
                </Link>
                
                <Link
                  to="/firearms"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Firearms
                </Link>
                
                <Link
                  to="/firearm-categories"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Firearm Types
                </Link>
                
                <Link
                  to="/how-to-buy"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  How to Buy
                </Link>
                
                <Link
                  to="/shipping"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Shipping
                </Link>
                
                <Link
                  to="/firearms-license"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  License Info
                </Link>
                
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  About
                </Link>
                
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Contact
                </Link>
                
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Admin
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
