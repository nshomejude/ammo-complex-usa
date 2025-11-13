import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Building,
  Users,
  Target,
  Heart,
  Globe,
  ArrowRight,
  Award,
  Leaf
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home9 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  const s2 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "About Arms Complex | Trusted Firearms Manufacturer";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Learn about our history, values, and dedication to building reliable firearms and ammunition.");
    updateMeta("keywords", "arms complex company, firearms manufacturer, company history, defense industry");
  }, []);

  const timeline = [
    { year: "1985", event: "Company Founded", desc: "Started as a small ammunition manufacturer in Virginia" },
    { year: "1992", event: "First Military Contract", desc: "Secured contract with U.S. Department of Defense" },
    { year: "2003", event: "Global Expansion", desc: "Opened distribution centers in Europe and Asia" },
    { year: "2012", event: "Innovation Award", desc: "Received industry recognition for ballistic technology" },
    { year: "2018", event: "Sustainability Initiative", desc: "Launched green manufacturing program" },
    { year: "2025", event: "Industry Leader", desc: "Serving 147+ countries with 5,000+ employees" }
  ];

  const leadership = [
    { name: "General Robert Patterson", title: "CEO & Chairman", experience: "35 years defense industry" },
    { name: "Dr. Sarah Mitchell", title: "Chief Technology Officer", experience: "20 years R&D leadership" },
    { name: "Colonel James Bradley", title: "VP Operations", experience: "25 years military logistics" },
    { name: "Maria Rodriguez", title: "Chief Financial Officer", experience: "18 years finance" }
  ];

  const values = [
    { icon: Target, title: "Precision", desc: "Uncompromising accuracy in every product" },
    { icon: Heart, title: "Safety", desc: "Prioritizing responsible ownership" },
    { icon: Award, title: "Excellence", desc: "Setting industry standards" },
    { icon: Globe, title: "Integrity", desc: "Ethical business practices worldwide" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#000000] via-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Building className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">ABOUT ARMS COMPLEX</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Built on Trust, Driven by Innovation.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            40 years of excellence in firearms and ammunition manufacturing
          </p>
          <a href="#timeline">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Discover Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Company Timeline */}
      <section id="timeline" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Our Journey</h2>
          <p className="text-muted-foreground text-lg">Four decades of innovation and growth</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#556B2F]" />
            
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-[#556B2F] flex items-center justify-center text-white font-bold border-4 border-background">
                    {item.year}
                  </div>
                  <Card className="hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{item.event}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#000000] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Leadership Team</h2>
            <p className="text-gray-300 text-lg">Industry experts leading innovation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20 hover:border-[#556B2F] transition-colors">
                <div className="aspect-square bg-gradient-to-br from-[#556B2F]/20 to-[#000000] flex items-center justify-center">
                  <Users className="h-24 w-24 text-[#556B2F]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                  <p className="text-[#CBB994] text-sm mb-3">{leader.title}</p>
                  <p className="text-gray-400 text-sm">{leader.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Target className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h2 className="text-3xl font-bold mb-4 uppercase">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                To design, manufacture, and distribute the world's most reliable firearms and 
                ammunition while promoting responsible ownership and use.
              </p>
              <p className="text-lg text-muted-foreground">
                We are committed to supporting defense, law enforcement, and civilian markets 
                with products that meet the highest standards of quality, safety, and performance.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-[#CBB994]">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 mb-4 text-[#CBB994]" />
              <h2 className="text-3xl font-bold mb-4 uppercase">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-4">
                To be the global leader in firearms innovation, setting industry standards 
                for precision, reliability, and ethical manufacturing.
              </p>
              <p className="text-lg text-muted-foreground">
                We envision a world where advanced technology and traditional craftsmanship 
                combine to create products that protect, serve, and empower responsible users worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">Principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-[#556B2F]/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-10 w-10 text-[#556B2F]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & Ethics */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Leaf className="h-12 w-12 mb-4 text-[#556B2F]" />
            <Badge className="mb-4 bg-[#556B2F]">SUSTAINABILITY</Badge>
            <h2 className="text-4xl font-bold mb-6 uppercase">Committed to Our Planet</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Since 2018, we've invested over $50 million in sustainable manufacturing practices, 
              reducing our carbon footprint by 40% while maintaining production quality.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#556B2F] flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>100% renewable energy in all facilities by 2026</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#556B2F] flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Lead-free ammunition options for all calibers</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#556B2F] flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Recycling program for brass casings and packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#556B2F] flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Water conservation and waste reduction initiatives</span>
              </li>
            </ul>
            <Link to="/contact">
              <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90">
                Learn More About Our Initiatives
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-[#556B2F]/20 to-[#2E2E2E]/20 rounded-lg flex items-center justify-center">
                <Leaf className="h-16 w-16 text-[#556B2F]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Join Our Journey</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a company that's shaping the future of the firearms industry
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home9;
