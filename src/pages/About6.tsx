import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Factory, CheckCircle, Award, Truck } from "lucide-react";
import { useEffect } from "react";

const About6 = () => {
  useEffect(() => {
    document.title = "The Manufacturing Edge | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Go behind the scenes at Arms Complex manufacturing facilities. Learn about our precision production process and quality materials.');
    }
  }, []);

  const process = [
    { step: "Material Selection", icon: Award, desc: "Premium-grade metals and composites" },
    { step: "Precision Machining", icon: Factory, desc: "CNC milling and turning operations" },
    { step: "Heat Treatment", icon: CheckCircle, desc: "Strengthening and hardening processes" },
    { step: "Assembly & Testing", icon: Truck, desc: "Expert assembly with rigorous testing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Factory className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Our Production Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every firearm is crafted with precision using state-of-the-art manufacturing technology 
            and strict quality control at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#556B2F]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-[#556B2F]" />
                </div>
                <div className="text-2xl font-bold text-[#556B2F] mb-2 font-['Oswald']">Step {idx + 1}</div>
                <h3 className="text-lg font-bold mb-2">{item.step}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-8 uppercase font-['Oswald']">Material Quality</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            We use only the highest-grade materials sourced from certified suppliers worldwide. 
            Each material batch undergoes rigorous testing before entering our production line.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-[#CBB994] mb-2">4140</div>
              <p className="text-gray-300">Steel Grade</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#CBB994] mb-2">7075</div>
              <p className="text-gray-300">Aluminum Alloy</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#CBB994] mb-2">100%</div>
              <p className="text-gray-300">Quality Tested</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About6;
