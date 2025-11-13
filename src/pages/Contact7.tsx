import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Phone, Mail, MapPin } from "lucide-react";
import { useEffect } from "react";

const Contact7 = () => {
  useEffect(() => {
    document.title = "Distributor Access | Arms Complex";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-[#556B2F] to-[#000000]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Badge className="mb-4 bg-[#CBB994] text-black">DISTRIBUTION</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Distributor Access</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto border-l-4 border-l-[#556B2F]">
          <CardContent className="p-8">
            <Truck className="h-12 w-12 mb-4 text-[#556B2F]" />
            <h3 className="text-2xl font-bold mb-4">Dealer Hotline</h3>
            <div className="space-y-3">
              <a href="tel:+15551234572" className="block text-2xl font-bold text-[#556B2F]">+1 (555) 123-4572</a>
              <a href="mailto:distributors@armscomplex.com" className="block text-lg text-[#556B2F]">distributors@armscomplex.com</a>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Contact7;
