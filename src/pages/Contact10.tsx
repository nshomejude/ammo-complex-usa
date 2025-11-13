import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone, Mail } from "lucide-react";
import { useEffect } from "react";

const Contact10 = () => {
  useEffect(() => {
    document.title = "Sales Network | Arms Complex";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-[#556B2F] to-[#2E2E2E]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Badge className="mb-4 bg-[#CBB994] text-black">SALES</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Sales Network</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto border-l-4 border-l-[#556B2F]">
          <CardContent className="p-8">
            <Users className="h-12 w-12 mb-4 text-[#556B2F]" />
            <h3 className="text-2xl font-bold mb-4">Sales Team</h3>
            <div className="space-y-3">
              <a href="tel:+15551234567" className="block text-2xl font-bold text-[#556B2F]">+1 (555) 123-4567</a>
              <a href="mailto:sales@armscomplex.com" className="block text-lg text-[#556B2F]">sales@armscomplex.com</a>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Contact10;
