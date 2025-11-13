import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Wrench,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Settings,
  Star
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home7 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  const s2 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Custom Firearms Manufacturing | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Design your own firearm or ammunition with our custom manufacturing service.");
    updateMeta("keywords", "custom firearms, custom gun manufacturing, bespoke firearms, personalized weapons");
  }, []);

  const buildSteps = [
    { step: "Consultation", desc: "Discuss your requirements with our expert team" },
    { step: "Design", desc: "3D modeling and specification finalization" },
    { step: "Manufacturing", desc: "Precision machining and assembly" },
    { step: "Testing", desc: "Comprehensive quality and performance testing" },
    { step: "Delivery", desc: "Secure shipping with full documentation" }
  ];

  const customOptions = [
    { category: "Caliber Selection", options: ["5.56 NATO", ".308 WIN", "6.5 Creedmoor", "9mm", ".45 ACP", "Custom"] },
    { category: "Barrel Length", options: ["10.5\"", "14.5\"", "16\"", "18\"", "20\"", "24\"", "Custom"] },
    { category: "Stock/Grip", options: ["Fixed", "Collapsible", "Precision", "Tactical", "Custom"] },
    { category: "Finish", options: ["Matte Black", "FDE", "OD Green", "Stainless", "Cerakote"] }
  ];

  const testimonials = [
    { 
      name: "Col. James Mitchell", 
      project: "Custom Precision Rifle", 
      review: "Exceeded all my expectations. Perfect accuracy at 1000 yards."
    },
    { 
      name: "Officer Sarah Chen", 
      project: "Duty Pistol Modification", 
      review: "Professional service and outstanding quality craftsmanship."
    },
    { 
      name: "Hunter Mike Davis", 
      project: "Custom Hunting Rifle", 
      review: "Built exactly to my specs. Best investment I've made."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#556B2F] via-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Wrench className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">CUSTOM MANUFACTURING</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Your Weapon, Your Way.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Bespoke firearms engineered to your exact specifications
          </p>
          <a href="#order-form">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Start Custom Build
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Custom Build Process */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">The Custom Build Process</h2>
          <p className="text-muted-foreground text-lg">From concept to completion in 5 steps</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {buildSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-6 p-6 border-l-4 border-l-[#556B2F] bg-card rounded-r-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#556B2F] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{step.step}</h3>
                <p className="text-muted-foreground text-lg">{step.desc}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#556B2F] flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Customization Options */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#000000] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Settings className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Customization Options</h2>
            <p className="text-gray-300 text-lg">Tailor every aspect to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {customOptions.map((option, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{option.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {option.options.map((opt, i) => (
                      <Badge key={i} variant="outline" className="text-gray-300 border-[#556B2F]/40 hover:bg-[#556B2F]/20 cursor-pointer">
                        {opt}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Begin Your Custom Order</h2>
          <p className="text-muted-foreground text-lg">Complete this form to start your consultation</p>
        </div>
        
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Full Name *</label>
                  <Input placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email *</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone</label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Firearm Type *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rifle">Rifle</SelectItem>
                      <SelectItem value="pistol">Pistol</SelectItem>
                      <SelectItem value="shotgun">Shotgun</SelectItem>
                      <SelectItem value="custom">Custom/Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold mb-2 block">Project Description *</label>
                <Textarea 
                  placeholder="Describe your custom firearm requirements, intended use, special features, etc..." 
                  rows={6}
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold mb-2 block">Budget Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-5k">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10-20k">$10,000 - $20,000</SelectItem>
                    <SelectItem value="20k+">$20,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90 text-white py-6">
                Submit Custom Build Request
                <ArrowRight className="ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Product Gallery */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Custom Builds Gallery</h2>
            <p className="text-muted-foreground text-lg">Showcase of recent custom projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Precision Long Range Rifle",
              "Custom Competition Pistol",
              "Tactical Carbine Build"
            ].map((project, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] flex items-center justify-center">
                  <Target className="h-24 w-24 text-[#CBB994] group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project}</h3>
                  <Badge className="bg-[#556B2F]">Custom Build</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Star className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-4 uppercase">Client Testimonials</h2>
          <p className="text-muted-foreground text-lg">What our custom build clients say</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#CBB994] text-[#CBB994]" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.project}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Ready to Build Your Dream Firearm?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our expert gunsmiths bring your vision to life with precision manufacturing
          </p>
          <a href="#order-form">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home7;
