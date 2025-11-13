import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Compass,
  Target,
  Mountain,
  Sun,
  Award,
  ArrowRight,
  Camera,
  Users
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home4 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  const s2 = useScrollAnimation();
  const s3 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Hunting Rifles & Outdoor Ammo | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Premium rifles and ammunition for hunters who demand precision, durability, and reliability.");
    updateMeta("keywords", "hunting rifles, outdoor ammunition, hunting gear, precision hunting");
  }, []);

  const seasonalGear = [
    { season: "Fall Season", gear: "Deer Hunting Rifles", caliber: ".308 WIN, .30-06", image: "🦌" },
    { season: "Winter Season", gear: "Cold Weather Gear", caliber: "All Calibers", image: "❄️" },
    { season: "Spring Season", gear: "Turkey Hunting", caliber: "12 Gauge", image: "🦃" },
    { season: "Year-Round", gear: "Varmint Control", caliber: ".223, .22 LR", image: "🎯" }
  ];

  const rifles = [
    { name: "Bolt Action Precision", weight: "7.5 lbs", range: "1000+ yards", price: "$1,899" },
    { name: "Lightweight Hunter", weight: "6.2 lbs", range: "600 yards", price: "$1,299" },
    { name: "All-Terrain Carbine", weight: "7.0 lbs", range: "800 yards", price: "$1,599" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#556B2F] via-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Sun className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">THE HUNTER'S EDGE</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            The Edge Every Hunter Deserves.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Precision-crafted rifles and ammunition for the modern hunter
          </p>
          <Link to="/firearms">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              View Hunting Gear
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Seasonal Gear Showcase */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Hunt Every Season</h2>
          <p className="text-muted-foreground text-lg">Purpose-built gear for every hunting adventure</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalGear.map((item, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{item.image}</div>
                <Badge className="mb-3 bg-[#556B2F]">{item.season}</Badge>
                <h3 className="text-xl font-bold mb-2">{item.gear}</h3>
                <p className="text-muted-foreground text-sm">{item.caliber}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Outdoor Ammunition Guide */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#2E2E2E] rounded-lg aspect-video flex items-center justify-center">
              <Target className="h-32 w-32 text-[#556B2F]" />
            </div>
            <div>
              <Badge className="mb-4 bg-[#556B2F]">AMMUNITION GUIDE</Badge>
              <h2 className="text-4xl font-bold mb-6 uppercase">Choose The Right Round</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Selecting the right ammunition is critical for ethical, effective hunting. 
                Our expert guide helps you match caliber to game.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mountain className="h-6 w-6 text-[#556B2F] mt-1" />
                  <div>
                    <span className="font-bold">Big Game:</span> .308 WIN, .30-06, .300 WIN MAG
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="h-6 w-6 text-[#556B2F] mt-1" />
                  <div>
                    <span className="font-bold">Medium Game:</span> .243 WIN, 6.5 Creedmoor, .270 WIN
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-[#556B2F] mt-1" />
                  <div>
                    <span className="font-bold">Varmint:</span> .223 REM, .22-250, .17 HMR
                  </div>
                </li>
              </ul>
              <Link to="/products" className="inline-block mt-6">
                <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90">
                  Browse Ammunition
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightweight Rifle Lineup */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Premium Hunting Rifles</h2>
          <p className="text-muted-foreground text-lg">Engineered for the backcountry</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rifles.map((rifle, idx) => (
            <Card key={idx} className="hover:shadow-2xl transition-all">
              <div className="aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] flex items-center justify-center">
                <Target className="h-24 w-24 text-[#CBB994]" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{rifle.name}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-semibold">{rifle.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Effective Range:</span>
                    <span className="font-semibold">{rifle.range}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-[#556B2F]">{rifle.price}</span>
                  <Link to="/firearms">
                    <Button variant="outline" className="hover:bg-[#556B2F] hover:text-white">
                      Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Customer Photo Stories */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Camera className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Hunter Success Stories</h2>
            <p className="text-gray-300 text-lg">Real hunters, real results</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mike T.", game: "Elk at 400 yards", location: "Colorado" },
              { name: "Sarah K.", game: "Whitetail Buck", location: "Pennsylvania" },
              { name: "James R.", game: "Mule Deer", location: "Montana" }
            ].map((story, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20">
                <div className="aspect-square bg-gradient-to-br from-[#556B2F]/20 to-[#000000] flex items-center justify-center">
                  <Award className="h-24 w-24 text-[#556B2F]" />
                </div>
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                  <p className="text-[#CBB994] mb-1">{story.game}</p>
                  <p className="text-gray-400 text-sm">{story.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Users className="h-16 w-16 mx-auto mb-6 text-[#556B2F]" />
        <h2 className="text-4xl font-bold mb-6 uppercase">Join Our Hunter's Club</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get exclusive access to new releases, hunting tips, and members-only discounts
        </p>
        <Link to="/contact">
          <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
            Join Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home4;
