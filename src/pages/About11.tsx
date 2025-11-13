import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Globe, Users, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const About11 = () => {
  useEffect(() => {
    document.title = "The Arms Complex Story | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'From humble beginnings to global leader - discover the complete Arms Complex story, our journey, milestones, and vision for the future.');
    }
  }, []);

  const timeline = [
    { year: "1985", title: "The Beginning", desc: "Founded in a small Virginia workshop" },
    { year: "1990", title: "First Contract", desc: "Awarded major military contract" },
    { year: "1995", title: "Global Expansion", desc: "Opened first international office" },
    { year: "2000", title: "ISO Certified", desc: "Achieved quality certification" },
    { year: "2010", title: "Innovation Hub", desc: "Launched R&D center" },
    { year: "2015", title: "Industry Leader", desc: "Became top 10 global manufacturer" },
    { year: "2020", title: "Tech Integration", desc: "Pioneered smart firearms technology" },
    { year: "2025", title: "Future Forward", desc: "Continuing to lead and innovate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">OUR STORY</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">The Arms Complex Story</h1>
          <p className="text-xl text-gray-200">40 years of excellence, innovation, and trust</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center uppercase font-['Oswald']">From Concept to Company</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              In 1985, master gunsmith John Mitchell opened a small workshop in Virginia with a simple mission: 
              to create firearms that military and law enforcement could trust with their lives. Starting with just 
              three employees and a handful of tools, Arms Complex was born from a passion for precision and excellence.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              What began as a local operation quickly gained recognition for exceptional quality. Word spread through 
              military circles about firearms that outperformed anything else on the market. By 1990, Arms Complex 
              secured its first major defense contract, marking the beginning of rapid growth.
            </p>
            <p className="text-lg leading-relaxed">
              Today, Arms Complex operates facilities on three continents, employs over 500 professionals, and serves 
              customers in 57 countries. But despite our growth, we've never lost sight of John's original vision: 
              uncompromising quality, constant innovation, and unwavering commitment to those who serve.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase font-['Oswald']">Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((milestone, idx) => (
              <Card key={idx} className="border-t-4 border-t-[#556B2F] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 mb-3 text-[#556B2F]" />
                  <div className="text-3xl font-bold text-[#556B2F] mb-2 font-['Oswald']">{milestone.year}</div>
                  <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase font-['Oswald']">
            Our Identity Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
                <div className="text-4xl font-bold text-white mb-2">57</div>
                <p className="text-gray-300">Countries Served</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardContent className="p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <p className="text-gray-300">Team Members</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardContent className="p-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
                <div className="text-4xl font-bold text-white mb-2">500K+</div>
                <p className="text-gray-300">Units Delivered</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Award className="h-16 w-16 mx-auto mb-6 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">Discover More About Us</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Learn how we can serve your organization's defense and security needs
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/products">
              <button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-6 py-3 rounded font-semibold">
                View Products
              </button>
            </a>
            <a href="/contact">
              <button className="border border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F] hover:text-white px-6 py-3 rounded font-semibold transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About11;
