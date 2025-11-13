import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Zap, Target, Rocket } from "lucide-react";
import { useEffect } from "react";

const About5 = () => {
  useEffect(() => {
    document.title = "Innovation First | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex leads the industry in firearms innovation and technology. Discover our R&D achievements and cutting-edge manufacturing processes.');
    }
  }, []);

  const innovations = [
    { year: "2020", title: "Smart Targeting System", description: "AI-powered precision enhancement" },
    { year: "2021", title: "Advanced Materials", description: "Lightweight composite firearms" },
    { year: "2022", title: "Modular Design Platform", description: "Customizable weapon systems" },
    { year: "2023", title: "Digital Integration", description: "IoT-enabled firearms technology" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">INNOVATION & TECHNOLOGY</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Innovation First</h1>
          <p className="text-xl text-gray-200">Advancing firearms technology for tomorrow</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Rocket className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Innovation Labs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our state-of-the-art R&D facilities house the brightest minds in firearms engineering, 
            continuously pushing the boundaries of what's possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Cpu className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-2 font-['Oswald']">50+</h3>
              <p className="text-muted-foreground">Engineers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Zap className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-2 font-['Oswald']">100+</h3>
              <p className="text-muted-foreground">Patents</p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Target className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-2 font-['Oswald']">$15M</h3>
              <p className="text-muted-foreground">Annual R&D Budget</p>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Rocket className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-2 font-['Oswald']">25+</h3>
              <p className="text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase font-['Oswald']">R&D Achievements Timeline</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {innovations.map((innovation, idx) => (
              <Card key={idx} className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 flex items-start gap-6">
                  <div className="text-3xl font-bold text-[#CBB994] font-['Oswald'] flex-shrink-0">{innovation.year}</div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{innovation.title}</h3>
                    <p className="text-gray-300">{innovation.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About5;
