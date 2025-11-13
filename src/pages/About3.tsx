import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Star, Award } from "lucide-react";
import { useEffect } from "react";

const About3 = () => {
  useEffect(() => {
    document.title = "Built on Trust | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex is built on trust, reliability, and unwavering commitment to quality. Discover why we are the trusted choice for defense and security.');
    }
  }, []);

  const values = [
    { icon: Shield, title: "Safety First", description: "Every product meets the highest safety standards" },
    { icon: CheckCircle, title: "Quality Assured", description: "Rigorous testing at every production stage" },
    { icon: Star, title: "Customer Focus", description: "Dedicated support and service excellence" },
    { icon: Award, title: "Industry Leader", description: "Recognized for innovation and reliability" }
  ];

  const testimonials = [
    { name: "Gen. Robert Mitchell", org: "U.S. Armed Forces", quote: "Arms Complex delivers reliability when it matters most." },
    { name: "Chief Sarah Thompson", org: "State Police", quote: "Outstanding quality and customer service every time." },
    { name: "Col. James Rodriguez", org: "NATO Defense", quote: "The gold standard in firearms manufacturing." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-[#556B2F] via-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">TRUST & RELIABILITY</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Built on Trust</h1>
          <p className="text-xl text-gray-200">Your safety is our promise</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center uppercase font-['Oswald']">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <Card key={idx} className="text-center hover:shadow-xl transition-shadow border-t-4 border-t-[#556B2F]">
              <CardContent className="p-8">
                <value.icon className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3 font-['Oswald']">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quality Process */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-8 text-center uppercase font-['Oswald']">Quality Assurance Process</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CBB994] flex items-center justify-center flex-shrink-0 font-bold text-black">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Material Inspection</h3>
                  <p className="text-gray-300">Every raw material is tested before entering production</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CBB994] flex items-center justify-center flex-shrink-0 font-bold text-black">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Manufacturing Standards</h3>
                  <p className="text-gray-300">ISO-certified processes ensure consistent quality</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CBB994] flex items-center justify-center flex-shrink-0 font-bold text-black">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Testing & Validation</h3>
                  <p className="text-gray-300">Rigorous performance testing on every unit</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CBB994] flex items-center justify-center flex-shrink-0 font-bold text-black">4</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Final Certification</h3>
                  <p className="text-gray-300">Products certified before shipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center uppercase font-['Oswald']">Trusted by Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-[#556B2F]/10 to-background">
              <CardContent className="p-8">
                <Star className="h-8 w-8 mb-4 text-[#CBB994]" />
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.org}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About3;
