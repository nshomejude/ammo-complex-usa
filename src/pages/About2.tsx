import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Globe, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const About2 = () => {
  useEffect(() => {
    document.title = "Our Legacy | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Discover the rich history and legacy of Arms Complex - from our founding to becoming a global leader in firearms and ammunition manufacturing.');
    }
  }, []);

  const milestones = [
    { year: "1985", title: "Founded", description: "Arms Complex established in Virginia" },
    { year: "1992", title: "First Export", description: "International distribution begins" },
    { year: "2000", title: "ISO Certified", description: "Achieved ISO 9001:2000 certification" },
    { year: "2010", title: "Global Expansion", description: "Opened facilities in 15+ countries" },
    { year: "2020", title: "Innovation Leader", description: "Advanced R&D center launched" },
    { year: "2025", title: "Industry Pioneer", description: "50K+ satisfied customers worldwide" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      {/* Brand Origins */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded in 1985 in Virginia, Arms Complex began as a small workshop with a vision to provide 
            superior firearms and ammunition to military and law enforcement. Through dedication to quality, 
            innovation, and customer service, we've grown into a global leader trusted by defense forces worldwide.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#556B2F] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-[#556B2F]" />
                  <span className="text-3xl font-bold text-[#556B2F] font-['Oswald']">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Award className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
            <h2 className="text-3xl font-bold mb-6 uppercase font-['Oswald']">Our Mission</h2>
            <p className="text-xl leading-relaxed">
              "To provide the highest quality firearms and ammunition while maintaining unwavering 
              commitment to safety, innovation, and customer satisfaction. We serve those who serve."
            </p>
          </div>
        </div>
      </section>

      {/* Growth Highlights */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center uppercase font-['Oswald']">By The Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
            <div className="text-4xl font-bold mb-2 text-[#556B2F]">50+</div>
            <p className="text-muted-foreground">Countries Served</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
            <div className="text-4xl font-bold mb-2 text-[#556B2F]">500K+</div>
            <p className="text-muted-foreground">Units Delivered</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
            <div className="text-4xl font-bold mb-2 text-[#556B2F]">25+</div>
            <p className="text-muted-foreground">Industry Awards</p>
          </div>
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
            <div className="text-4xl font-bold mb-2 text-[#556B2F]">40</div>
            <p className="text-muted-foreground">Years of Excellence</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About2;
