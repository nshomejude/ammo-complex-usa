import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect } from "react";

const Contact11 = () => {
  useEffect(() => {
    document.title = "Headquarters | Arms Complex";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Badge className="mb-4 bg-[#CBB994] text-black">HQ</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Headquarters</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-l-4 border-l-[#556B2F]">
            <CardContent className="p-8">
              <Building2 className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-4">HQ Address</h3>
              <p className="text-lg">Arms Complex International<br/>1250 Defense Boulevard<br/>Virginia, VA 22303</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#556B2F]">
            <CardContent className="p-8">
              <Phone className="h-12 w-12 mb-4 text-[#556B2F]" />
              <a href="tel:+15551234570" className="text-2xl font-bold text-[#556B2F]">+1 (555) 123-4570</a>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact11;
