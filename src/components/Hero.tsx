import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-tactical/10" />
      
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tactical/30 bg-tactical/10 px-4 py-2">
            <Shield className="h-4 w-4 text-tactical" />
            <span className="text-sm font-medium text-tactical">Licensed FFL Dealer</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Premium Ammunition
            <span className="block text-tactical">For Licensed Buyers</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Quality ammunition for law-abiding citizens. All sales require valid firearms license verification and comply with federal and state regulations.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto bg-tactical hover:bg-tactical/90">
                Browse Products
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Legal Requirements
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-tactical" />
              <span>FFL Verified Sales</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-tactical" />
              <span>Legal State Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-tactical" />
              <span>Secure Transactions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
