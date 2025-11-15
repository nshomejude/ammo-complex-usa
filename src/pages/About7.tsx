import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin, Shield, Users } from "lucide-react";
import { useEffect } from "react";

const About7 = () => {
  useEffect(() => {
    document.title = "Global Impact | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex serves customers globally with offices and partners across 6 continents. Discover our international reach and partnerships.');
    }
  }, []);

  const regions = [
    { name: "North America", countries: 3, partners: 45 },
    { name: "Europe", countries: 18, partners: 62 },
    { name: "Asia Pacific", countries: 12, partners: 38 },
    { name: "Middle East", countries: 8, partners: 25 },
    { name: "South America", countries: 6, partners: 18 },
    { name: "Africa", countries: 10, partners: 22 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Globe className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Worldwide Presence</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            With offices and authorized distributors around the world, we deliver reliable 
            firearms and ammunition wherever they're needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#556B2F] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MapPin className="h-10 w-10 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">{region.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Countries:</span>
                    <span className="font-bold">{region.countries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Partners:</span>
                    <span className="font-bold">{region.partners}+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase font-['Oswald']">Export Compliance</h2>
          <div className="max-w-3xl mx-auto text-white text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
            <p className="text-lg leading-relaxed mb-8">
              Arms Complex maintains full compliance with international arms trade regulations including 
              ITAR, UN Register of Conventional Arms, and NATO Quality Assurance standards. We work closely 
              with government agencies to ensure all exports meet legal requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-[#CBB994] mb-2">ITAR</div>
                <p className="text-sm text-gray-300">Certified</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#CBB994] mb-2">NATO</div>
                <p className="text-sm text-gray-300">Quality Assured</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#CBB994] mb-2">ISO</div>
                <p className="text-sm text-gray-300">9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Users className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Trusted Partners</h2>
          <p className="text-muted-foreground text-lg">Working with leading defense organizations worldwide</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="aspect-square bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] rounded-lg flex items-center justify-center">
              <Shield className="h-12 w-12 text-[#CBB994]" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About7;
