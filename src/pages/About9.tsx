import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Shield, Award, Users } from "lucide-react";
import { useEffect } from "react";

const About9 = () => {
  useEffect(() => {
    document.title = "Our Mission | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Discover the mission and core values of Arms Complex. We are committed to excellence, innovation, and serving those who serve.');
    }
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Safety & Quality",
      description: "Every product meets the highest standards of safety and performance"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuous improvement in all aspects of our business"
    },
    {
      icon: Users,
      title: "Integrity",
      description: "Honest, ethical conduct in every transaction"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leading the industry with cutting-edge technology"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide every decision we make and every product we create
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow border-t-4 border-t-[#556B2F]">
              <CardContent className="p-8">
                <value.icon className="h-16 w-16 mb-6 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">{value.title}</h3>
                <p className="text-lg text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-12 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-16 h-1 bg-[#CBB994] mx-auto mb-6"></div>
                <h2 className="text-3xl font-bold text-white mb-4 uppercase font-['Oswald']">Founder's Message</h2>
              </div>
              <blockquote className="text-xl text-white leading-relaxed text-center italic">
                "When we founded Arms Complex in 1985, we had a simple vision: to create firearms of 
                uncompromising quality that professionals could trust with their lives. Decades later, 
                that mission remains unchanged. We are proud to serve those who defend and protect, 
                and we will never stop innovating to give them the edge they need."
              </blockquote>
              <div className="text-center mt-8">
                <p className="text-[#CBB994] font-bold text-lg">— John Mitchell</p>
                <p className="text-gray-300">Founder & CEO, Arms Complex</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're military, law enforcement, or a responsible civilian shooter, 
            we invite you to experience the Arms Complex difference.
          </p>
          <a href="/products">
            <button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-8 py-4 rounded text-lg font-semibold">
              Explore Our Products
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About9;
