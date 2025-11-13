import { Header10 } from "@/components/Header10";
import { Footer10 } from "@/components/Footer10";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Cpu, Zap, Microscope, ArrowRight, Atom, Shield } from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home10 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Smart Firearms & Ballistic Technology | Arms Complex";
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    updateMeta("description", "Discover advanced firearm innovation, smart weapons, and AI-driven manufacturing technology.");
    updateMeta("keywords", "firearm innovation, smart weapons, ballistic technology, AI manufacturing");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header10 />
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-[#000000] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <Cpu className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">TECHNOLOGY & INNOVATION</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase">Innovation That Redefines Firepower.</h1>
          <p className="text-xl mb-8 text-gray-200">Next-generation smart weapons and AI-driven manufacturing</p>
          <Link to="/products"><Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">Discover ArmsTech<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Atom, title: "Smart Targeting Systems", desc: "AI-assisted precision aiming technology" },
            { icon: Zap, title: "Advanced Materials", desc: "Nano-engineered alloys for superior performance" },
            { icon: Microscope, title: "Robotics Manufacturing", desc: "Automated precision assembly lines" }
          ].map((tech, idx) => (
            <Card key={idx} className="hover:shadow-2xl transition-all"><CardContent className="p-8 text-center"><tech.icon className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" /><h3 className="text-2xl font-bold mb-3">{tech.title}</h3><p className="text-muted-foreground">{tech.desc}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <section className="bg-[#2E2E2E] py-20"><div className="container mx-auto px-4 text-center"><Shield className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" /><h2 className="text-4xl font-bold mb-6 uppercase text-white">Learn More About ArmsTech</h2><Link to="/contact"><Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">Contact Innovation Team<ArrowRight className="ml-2 h-5 w-5" /></Button></Link></div></section>
      <Footer10 />
    </div>
  );
};

export default Home10;
