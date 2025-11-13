import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Users, 
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Truck,
  FileCheck
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home3 = () => {
  const scrollY = useParallax();
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();
  const section4 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Defense Ammunition & Security Supplies | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Trusted defense and law enforcement partner delivering safe, high-performance ammunition worldwide.");
    updateMeta("keywords", "defense equipment, law enforcement ammunition, security supplies, tactical defense");
  }, []);

  const partners = [
    "U.S. Department of Defense", "NATO Forces", "FBI", "State Police",
    "Border Patrol", "International Defense Forces", "Special Operations", "SWAT Teams"
  ];

  const caseStudies = [
    {
      title: "Law Enforcement Agency Supply",
      description: "Equipped 5,000+ officers across 12 states",
      impact: "99.9% reliability rate"
    },
    {
      title: "Military Contract Fulfillment",
      description: "Delivered 2M rounds to allied forces",
      impact: "On-time delivery guaranteed"
    },
    {
      title: "Border Security Initiative",
      description: "Comprehensive ammunition supply program",
      impact: "24/7 support provided"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#000000] to-[#2E2E2E]">
        <div 
          className="absolute inset-0 bg-black/30 z-10 parallax-slow"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-4 bg-[#CBB994] text-black">DEFENSE & SECURITY</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Equip Your Force.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Trusted by law enforcement and defense agencies worldwide
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Bulk Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Partner Logos Grid */}
      <section 
        ref={section1.ref}
        className={`bg-white dark:bg-[#1a1a1a] py-16 border-y ${section1.isVisible ? 'scroll-fade-up' : 'scroll-hidden'}`}
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8 uppercase tracking-wide">Trusted By</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center p-6 border rounded-lg hover:border-[#556B2F] transition-colors">
                <Shield className="h-8 w-8 text-[#556B2F] mr-3" />
                <span className="font-semibold text-sm">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ammunition Supply Chain Info */}
      <section 
        ref={section2.ref}
        className={`container mx-auto px-4 py-20 ${section2.isVisible ? 'scroll-scale-in' : 'scroll-hidden'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Our Supply Chain</h2>
          <p className="text-muted-foreground text-lg">From manufacturing to deployment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Award, title: "Manufacturing", desc: "State-of-the-art production facilities" },
            { icon: FileCheck, title: "Quality Control", desc: "Rigorous testing protocols" },
            { icon: Truck, title: "Logistics", desc: "Secure global distribution" },
            { icon: CheckCircle, title: "Deployment", desc: "On-time delivery guaranteed" }
          ].map((step, idx) => (
            <Card key={idx} className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <step.icon className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bulk Order Form */}
      <section 
        ref={section3.ref}
        className={`bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] py-20 ${section3.isVisible ? 'scroll-fade-left' : 'scroll-hidden'}`}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Request Bulk Pricing</h2>
            <p className="text-gray-200 text-lg">Get a custom quote for your agency</p>
          </div>
          
          <Card className="bg-white/95 dark:bg-background/95">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Organization Name *</label>
                    <Input placeholder="Agency or Department" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Contact Person *</label>
                    <Input placeholder="Full Name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Email *</label>
                    <Input type="email" placeholder="contact@agency.gov" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Phone *</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold mb-2 block">Requirements *</label>
                  <Textarea 
                    placeholder="Please describe your ammunition needs, quantities, and delivery timeline..." 
                    rows={5}
                  />
                </div>
                
                <Button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90 text-white py-6">
                  Submit Bulk Inquiry
                  <ArrowRight className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Defense Case Studies */}
      <section 
        ref={section4.ref}
        className={`container mx-auto px-4 py-20 ${section4.isVisible ? 'scroll-fade-right' : 'scroll-hidden'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Success Stories</h2>
          <p className="text-muted-foreground text-lg">Real-world defense partnerships</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <Badge className="bg-[#CBB994] text-black">{study.impact}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Partner With Us Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the agencies and forces that trust Arms Complex for their critical defense needs
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home3;
