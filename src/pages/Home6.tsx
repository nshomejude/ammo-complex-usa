import { Header6 } from "@/components/Header6";
import { Footer6 } from "@/components/Footer6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Globe,
  Plane,
  Shield,
  FileCheck,
  Truck,
  ArrowRight,
  MapPin,
  Award
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home6 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  const s2 = useScrollAnimation();
  const s3 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Global Defense Distribution | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Efficient, compliant, and reliable international distribution of arms and ammunition worldwide.");
    updateMeta("keywords", "arms export, global distribution, international firearms, defense logistics");
  }, []);

  const regions = [
    { name: "North America", partners: "45+", deliveries: "10K+" },
    { name: "Europe", partners: "32+", deliveries: "8K+" },
    { name: "Middle East", partners: "18+", deliveries: "5K+" },
    { name: "Asia Pacific", partners: "25+", deliveries: "6K+" },
    { name: "South America", partners: "12+", deliveries: "3K+" },
    { name: "Africa", partners: "15+", deliveries: "4K+" }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "ITAR Compliance Certified",
    "NATO Quality Assurance",
    "UN Register of Conventional Arms",
    "Defense Export Controls",
    "International Safety Standards"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header6 />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2E2E2E] via-[#000000] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Plane className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">GLOBAL DISTRIBUTION</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Delivering Safety Worldwide.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Trusted international partner for defense logistics and arms distribution
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Global Distribution Map */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Globe className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase">Worldwide Reach</h2>
          <p className="text-muted-foreground text-lg">Operating in 6 continents, 147+ countries</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <MapPin className="h-10 w-10 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4">{region.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Partners:</span>
                    <Badge className="bg-[#556B2F]">{region.partners}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Deliveries:</span>
                    <Badge variant="outline">{region.deliveries}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Compliance Certifications */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#000000] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FileCheck className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Compliance Certifications</h2>
            <p className="text-gray-300 text-lg">Fully certified for international arms trade</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <Shield className="h-8 w-8 text-[#556B2F]" />
                  <span className="text-white font-semibold">{cert}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Process */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Our Distribution Process</h2>
          <p className="text-muted-foreground text-lg">End-to-end logistics management</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              { 
                step: "Order Processing", 
                icon: FileCheck,
                desc: "Secure order placement with compliance verification"
              },
              { 
                step: "Export Documentation", 
                icon: Shield,
                desc: "Complete legal documentation and export licenses"
              },
              { 
                step: "Secure Packaging", 
                icon: Award,
                desc: "Military-grade packaging and tracking systems"
              },
              { 
                step: "Global Shipping", 
                icon: Plane,
                desc: "Air and sea freight with full insurance coverage"
              },
              { 
                step: "Delivery & Verification", 
                icon: Truck,
                desc: "Confirmed delivery with signature verification"
              }
            ].map((process, idx) => (
              <div key={idx} className="flex items-start gap-6 p-6 border-l-4 border-l-[#556B2F] bg-card rounded-r-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[#556B2F]/10 flex items-center justify-center flex-shrink-0">
                  <process.icon className="h-8 w-8 text-[#556B2F]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Step {idx + 1}: {process.step}</h3>
                  <p className="text-muted-foreground text-lg">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse Photo Gallery */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Our Facilities</h2>
            <p className="text-muted-foreground text-lg">State-of-the-art distribution centers worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Main Warehouse", location: "Virginia, USA", size: "250,000 sq ft" },
              { title: "European Hub", location: "Rotterdam, NL", size: "180,000 sq ft" },
              { title: "Asia Pacific Center", location: "Singapore", size: "120,000 sq ft" }
            ].map((facility, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] flex items-center justify-center">
                  <Truck className="h-24 w-24 text-[#CBB994]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {facility.location}
                    </p>
                    <p className="text-sm">
                      <Badge className="bg-[#556B2F]">{facility.size}</Badge>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Partner With Arms Complex</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our network of trusted international partners for reliable, compliant arms distribution
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Request Partnership Info
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer6 />
    </div>
  );
};

export default Home6;
