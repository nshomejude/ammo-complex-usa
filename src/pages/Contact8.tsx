import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Mail, Clock } from "lucide-react";
import { useEffect } from "react";

const Contact8 = () => {
  useEffect(() => {
    document.title = "Customer Support | Arms Complex";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Badge className="mb-4 bg-[#CBB994] text-black">SUPPORT</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Customer Support</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-l-4 border-l-[#556B2F]">
            <CardContent className="p-8">
              <Wrench className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-4">Technical Support</h3>
              <a href="mailto:support@armscomplex.com" className="text-xl text-[#556B2F] font-semibold">support@armscomplex.com</a>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#556B2F]">
            <CardContent className="p-8">
              <Clock className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
              <p>Monday - Friday: 8 AM - 8 PM EST<br/>Saturday: 9 AM - 5 PM EST</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact8;
