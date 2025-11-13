import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { 
  Atom,
  Zap,
  Shield,
  Target,
  Award,
  ArrowRight,
  Microscope,
  Beaker
} from "lucide-react";
import { useEffect } from "react";

const Home5 = () => {
  useEffect(() => {
    document.title = "Ballistic Ammo Engineering | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Discover the science behind ballistic excellence with advanced materials and precision engineering.");
    updateMeta("keywords", "ammunition design, ballistic engineering, ammunition technology, precision manufacturing");
  }, []);

  const performanceData = [
    { caliber: "5.56 NATO", velocity: "3,100 fps", energy: "1,300 ft-lbs", accuracy: "1.5 MOA" },
    { caliber: ".308 WIN", velocity: "2,750 fps", energy: "2,650 ft-lbs", accuracy: "1.0 MOA" },
    { caliber: "9mm", velocity: "1,180 fps", energy: "380 ft-lbs", accuracy: "2.0 MOA" },
    { caliber: ".45 ACP", velocity: "890 fps", energy: "400 ft-lbs", accuracy: "2.5 MOA" }
  ];

  const testingSteps = [
    { step: "Material Selection", desc: "Premium copper and lead alloys" },
    { step: "Ballistic Testing", desc: "High-speed chronograph analysis" },
    { step: "Pressure Testing", desc: "SAAMI specification compliance" },
    { step: "Accuracy Validation", desc: "100-yard precision testing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#000000] via-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM1NTZCMkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTIgMi00IDJoLTJjLTIgMC00IDItNCA0cy0yIDItMiAyIDItMiAyLTJoMmMyIDAgNCAyIDQgNHpNNCA2YzAtMiAyLTQgMi00czItMiA0LTJoMmMyIDAgNCAyIDQgNHMyIDIgMiAyLTItMi0yLTJoLTJjLTItNC00LTQtNC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <Atom className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">AMMUNITION ENGINEERING</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Power Meets Precision.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Advanced ballistic engineering for superior performance
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Explore Ammo Technology
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Ballistic Charts & Specs */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Performance Data</h2>
          <p className="text-muted-foreground text-lg">Scientific precision in every round</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Caliber</TableHead>
                  <TableHead className="font-bold">Muzzle Velocity</TableHead>
                  <TableHead className="font-bold">Muzzle Energy</TableHead>
                  <TableHead className="font-bold">Accuracy (MOA)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((data, idx) => (
                  <TableRow key={idx} className="hover:bg-[#556B2F]/5">
                    <TableCell className="font-semibold">{data.caliber}</TableCell>
                    <TableCell>{data.velocity}</TableCell>
                    <TableCell>{data.energy}</TableCell>
                    <TableCell><Badge className="bg-[#556B2F]">{data.accuracy}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Testing Process Showcase */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#000000] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Microscope className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Our Testing Process</h2>
            <p className="text-gray-300 text-lg">Every batch undergoes rigorous validation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingSteps.map((step, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20 hover:border-[#556B2F] transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#556B2F]/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#556B2F]">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.step}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Innovation Story */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-[#556B2F]">RESEARCH & DEVELOPMENT</Badge>
            <h2 className="text-4xl font-bold mb-6 uppercase">Innovation In Every Grain</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Our R&D team consists of ballistic engineers, materials scientists, and 
              firearms experts who continuously push the boundaries of ammunition performance.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <Beaker className="h-6 w-6 text-[#556B2F] mt-1" />
                <div>
                  <span className="font-bold">Advanced Materials:</span> Proprietary copper alloys for maximum performance
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-[#556B2F] mt-1" />
                <div>
                  <span className="font-bold">Optimized Propellants:</span> Temperature-stable powders for consistent velocity
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Target className="h-6 w-6 text-[#556B2F] mt-1" />
                <div>
                  <span className="font-bold">Precision Tolerances:</span> Sub-MOA accuracy from every lot
                </div>
              </li>
            </ul>
            <Link to="/about">
              <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90">
                Learn About Our Lab
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] rounded-lg flex items-center justify-center">
                <Shield className="h-16 w-16 text-[#CBB994]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Why Arms Complex Leads</h2>
            <p className="text-muted-foreground text-lg">Performance comparison vs industry standard</p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-center">Arms Complex</TableHead>
                    <TableHead className="text-center">Industry Standard</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Accuracy Guarantee</TableCell>
                    <TableCell className="text-center"><Badge className="bg-green-500">≤ 1.5 MOA</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="outline">≤ 3 MOA</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Quality Testing</TableCell>
                    <TableCell className="text-center"><Badge className="bg-green-500">100% Inspected</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="outline">Sample Testing</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Velocity Consistency</TableCell>
                    <TableCell className="text-center"><Badge className="bg-green-500">± 15 fps</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="outline">± 50 fps</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Warranty</TableCell>
                    <TableCell className="text-center"><Badge className="bg-green-500">Lifetime</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="outline">1 Year</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Explore The Science</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how ballistic engineering excellence translates to real-world performance
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              View Technical Specs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home5;
