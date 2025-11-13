import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Store, TrendingUp, Award, ArrowRight, Users } from "lucide-react";
import { useEffect } from "react";

const Home11 = () => {
  useEffect(() => {
    document.title = "Wholesale Firearms & Dealer Network | Arms Complex";
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    updateMeta("description", "Become a dealer and access wholesale pricing for firearms and ammunition.");
    updateMeta("keywords", "wholesale ammo, firearms dealer, wholesale firearms, dealer network");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <Store className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">WHOLESALE & RETAIL PARTNERS</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase">Join Our Dealer Network.</h1>
          <p className="text-xl mb-8 text-gray-200">Access exclusive wholesale pricing and dealer benefits</p>
          <Link to="/contact"><Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">Apply Now<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: TrendingUp, title: "Competitive Pricing", desc: "Up to 40% off retail on bulk orders" },
            { icon: Award, title: "Marketing Support", desc: "Co-branded materials and campaigns" },
            { icon: Users, title: "Dedicated Rep", desc: "Personal account manager for your business" }
          ].map((benefit, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all"><CardContent className="p-8 text-center"><benefit.icon className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" /><h3 className="text-2xl font-bold mb-3">{benefit.title}</h3><p className="text-muted-foreground">{benefit.desc}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <section className="bg-[#2E2E2E] py-20"><div className="container mx-auto px-4 text-center"><Store className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" /><h2 className="text-4xl font-bold mb-6 uppercase text-white">Start Selling Arms Complex</h2><Link to="/contact"><Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">Apply for Dealer Account<ArrowRight className="ml-2 h-5 w-5" /></Button></Link></div></section>
      <Footer />
    </div>
  );
};

export default Home11;
