import { Link } from "react-router-dom";
import { Shield, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";
import { CartButton } from "@/components/CartButton";
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

  const aboutPages = [
    { path: "/about", label: "About (Original)" },
    { path: "/about2", label: "About 2 - Our Legacy" },
    { path: "/about3", label: "About 3 - Built on Trust" },
    { path: "/about4", label: "About 4 - Our People" },
    { path: "/about5", label: "About 5 - Innovation First" },
    { path: "/about6", label: "About 6 - Manufacturing Edge" },
    { path: "/about7", label: "About 7 - Global Impact" },
    { path: "/about8", label: "About 8 - Safety & Responsibility" },
    { path: "/about9", label: "About 9 - Our Mission" },
    { path: "/about10", label: "About 10 - Strength Through Innovation" },
    { path: "/about11", label: "About 11 - The Arms Complex Story" },
  ];

  const contactPages = [
    { path: "/contact", label: "Contact (Original)" },
    { path: "/contact2", label: "Contact 2 - Reach Us" },
    { path: "/contact3", label: "Contact 3 - Global Offices" },
    { path: "/contact4", label: "Contact 4 - Talk to Us" },
    { path: "/contact5", label: "Contact 5 - Visit Our Facility" },
    { path: "/contact6", label: "Contact 6 - Corporate Communication" },
    { path: "/contact7", label: "Contact 7 - Distributor Access" },
    { path: "/contact8", label: "Contact 8 - Customer Support" },
    { path: "/contact9", label: "Contact 9 - Regional Hubs" },
    { path: "/contact10", label: "Contact 10 - Sales Network" },
    { path: "/contact11", label: "Contact 11 - Headquarters" },
  ];

  const reviewsPages = [
    { path: "/reviews1", label: "Reviews 1 - Dark Minimal" },
    { path: "/reviews2", label: "Reviews 2 - Industrial Metallic" },
    { path: "/reviews3", label: "Reviews 3 - Masonry Layout" },
    { path: "/reviews4", label: "Reviews 4 - Split Screen" },
    { path: "/reviews5", label: "Reviews 5 - Gradient Navy" },
    { path: "/reviews6", label: "Reviews 6 - Tactical Cards" },
    { path: "/reviews7", label: "Reviews 7 - Elegant Light" },
    { path: "/reviews8", label: "Reviews 8 - Dark Gold Accents" },
    { path: "/reviews9", label: "Reviews 9 - Military Rugged" },
    { path: "/reviews10", label: "Reviews 10 - Tech Inspired" },
  ];

  const shopPages = [
    { path: "/products", label: "Products (Original)" },
    { path: "/shop2", label: "Shop 2 - Premium Clean Dark" },
    { path: "/shop3", label: "Shop 3 - Tactical Arsenal" },
    { path: "/shop4", label: "Shop 4 - Dual Filter Layout" },
    { path: "/shop5", label: "Shop 5 - Glassmorphic" },
    { path: "/shop6", label: "Shop 6 - Military Armory" },
    { path: "/shop7", label: "Shop 7 - Dual Sidebar" },
    { path: "/shop8", label: "Shop 8 - Modern Live Filter" },
    { path: "/shop9", label: "Shop 9 - Compact Pagination" },
    { path: "/shop10", label: "Shop 10 - Premium Collection" },
    { path: "/shop11", label: "Shop 11 - Ultimate Arsenal" },
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
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                Shop <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {shopPages.map((page) => (
                  <DropdownMenuItem key={page.path} asChild>
                    <Link to={page.path} className="w-full cursor-pointer">{page.label}</Link>
                  </DropdownMenuItem>
                ))}
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
            <Link to="/reloading-guide" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Reloading Guide
            </Link>
            <Link to="/ballistic-calculator" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Ballistic Calculator
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                About <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {aboutPages.map((page) => (
                  <DropdownMenuItem key={page.path} asChild>
                    <Link to={page.path} className="w-full cursor-pointer">{page.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                Contact <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {contactPages.map((page) => (
                  <DropdownMenuItem key={page.path} asChild>
                    <Link to={page.path} className="w-full cursor-pointer">{page.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-tactical transition-colors flex items-center gap-1">
                Reviews <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {reviewsPages.map((page) => (
                  <DropdownMenuItem key={page.path} asChild>
                    <Link to={page.path} className="w-full cursor-pointer">{page.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/admin" className="text-sm font-medium text-foreground hover:text-tactical transition-colors">
              Admin
            </Link>
            <CartButton />
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
                  <AccordionItem value="about-pages">
                    <AccordionTrigger className="text-base font-semibold">
                      About
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {aboutPages.map((page) => (
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
                  <AccordionItem value="contact-pages">
                    <AccordionTrigger className="text-base font-semibold">
                      Contact
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {contactPages.map((page) => (
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
                  <AccordionItem value="reviews-pages">
                    <AccordionTrigger className="text-base font-semibold">
                      Reviews
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {reviewsPages.map((page) => (
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
                  <AccordionItem value="shop-pages">
                    <AccordionTrigger className="text-base font-semibold">
                      Shop Pages
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {shopPages.map((page) => (
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
                  to="/reloading-guide"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Reloading Guide
                </Link>
                
                <Link
                  to="/ballistic-calculator"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium hover:text-tactical transition-colors"
                >
                  Ballistic Calculator
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
