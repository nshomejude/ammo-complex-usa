import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";
import { useEffect } from "react";

const About4 = () => {
  useEffect(() => {
    document.title = "Our People | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Meet the dedicated team behind Arms Complex. Our people are our greatest asset - skilled professionals committed to excellence.');
    }
  }, []);

  const leadership = [
    { name: "John Mitchell", role: "Chief Executive Officer", bio: "30+ years in defense manufacturing" },
    { name: "Sarah Chen", role: "Chief Operations Officer", bio: "Expert in global logistics and distribution" },
    { name: "Robert Kane", role: "Chief Technology Officer", bio: "Leading innovation in firearms technology" }
  ];

  const team = [
    { name: "Engineering Team", count: "120+", description: "Design and development experts" },
    { name: "Quality Assurance", count: "45+", description: "Ensuring every product meets standards" },
    { name: "Production Staff", count: "300+", description: "Skilled craftsmen and technicians" },
    { name: "Sales & Support", count: "80+", description: "Dedicated customer service professionals" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      {/* Leadership */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Award className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Leadership Team</h2>
          <p className="text-muted-foreground text-lg">Experienced leaders driving our vision forward</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {leadership.map((leader, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Oswald']">{leader.name}</h3>
                <p className="text-[#556B2F] font-semibold mb-3">{leader.role}</p>
                <p className="text-muted-foreground">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Overview */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heart className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
            <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Our Amazing Team</h2>
            <p className="text-muted-foreground text-lg">545+ dedicated professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((dept, idx) => (
              <Card key={idx} className="border-l-4 border-l-[#556B2F]">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-[#556B2F] mb-2 font-['Oswald']">{dept.count}</div>
                  <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-muted-foreground">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 uppercase font-['Oswald']">What Drives Us</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every member of the Arms Complex team shares a commitment to excellence, safety, and innovation. 
            We believe in fostering a culture of continuous improvement, collaboration, and respect. Our people 
            don't just work here—they're passionate about what they do and take pride in every product that 
            bears our name.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About4;
