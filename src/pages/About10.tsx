import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Award, Star } from "lucide-react";
import { useEffect } from "react";

const About10 = () => {
  useEffect(() => {
    document.title = "Strength Through Innovation | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex combines military-grade engineering with innovative technology. Discover how we build strength through innovation.');
    }
  }, []);

  const testimonials = [
    { name: "Col. David Martinez", org: "U.S. Special Forces", quote: "The reliability of Arms Complex firearms in extreme conditions is unmatched." },
    { name: "Commander Lisa Wong", org: "Naval Special Warfare", quote: "Innovation that saves lives. Arms Complex sets the standard." },
    { name: "Sgt. Major Thomas Hill", org: "Army Rangers", quote: "When mission success is critical, we trust Arms Complex." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-[#556B2F] via-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">MILITARY EXCELLENCE</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Strength Through Innovation</h1>
          <p className="text-xl text-gray-200">Engineering resilience for the modern battlefield</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Zap className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Engineering Excellence</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our engineering team combines decades of military experience with cutting-edge technology 
            to create firearms that perform when it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-t-4 border-t-[#556B2F] hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-3 font-['Oswald']">Mil-Spec Standards</h3>
              <p className="text-muted-foreground">Exceeding military specifications in every product</p>
            </CardContent>
          </Card>

          <Card className="text-center border-t-4 border-t-[#556B2F] hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Award className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-3 font-['Oswald']">Battle-Tested</h3>
              <p className="text-muted-foreground">Proven performance in the harshest environments</p>
            </CardContent>
          </Card>

          <Card className="text-center border-t-4 border-t-[#556B2F] hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Zap className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-3 font-['Oswald']">Next-Gen Tech</h3>
              <p className="text-muted-foreground">Integrating advanced technology for tactical advantage</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase font-['Oswald']">
            Trusted by Defense Professionals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-8">
                  <Star className="h-8 w-8 mb-4 text-[#CBB994]" />
                  <p className="text-lg italic mb-6 text-white">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">{testimonial.org}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">See Our Innovations</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the technology that gives defense professionals the tactical edge
          </p>
          <a href="/products">
            <button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-8 py-4 rounded text-lg font-semibold">
              Explore Our Technology
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About10;
