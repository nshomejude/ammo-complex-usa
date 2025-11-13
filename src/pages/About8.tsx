import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, CheckCircle, Users } from "lucide-react";
import { useEffect } from "react";

const About8 = () => {
  useEffect(() => {
    document.title = "Safety and Responsibility | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex is committed to firearm safety and corporate responsibility. Learn about our safety standards, training programs, and ethical practices.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#556B2F] to-[#2E2E2E]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">SAFETY & RESPONSIBILITY</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Safety First</h1>
          <p className="text-xl text-gray-200">Committed to responsible firearms manufacturing</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Our Safety Commitment</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Arms Complex, safety isn't just a priority—it's woven into every aspect of our business. 
            From design to delivery, we maintain the highest standards to protect users and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Award className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Product Safety</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Rigorous testing protocols for every firearm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Advanced safety mechanisms in all products</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Clear safety instructions and warnings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Continuous product improvement program</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#556B2F]">
            <CardContent className="p-8">
              <Users className="h-12 w-12 mb-4 text-[#556B2F]" />
              <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Training & Education</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Free safety training for purchasers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Educational resources and materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Partnership with safety organizations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                  <span>Community outreach programs</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#556B2F] to-[#2E2E2E] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-white text-center">
            <h2 className="text-4xl font-bold mb-8 uppercase font-['Oswald']">Compliance & Ethics</h2>
            <p className="text-xl leading-relaxed mb-12">
              We adhere to all federal, state, and international regulations governing firearms manufacturing 
              and distribution. Our compliance team ensures every transaction meets legal requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-[#CBB994] mb-2">100%</div>
                <p className="text-gray-300">Compliant Operations</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CBB994] mb-2">24/7</div>
                <p className="text-gray-300">Monitoring Systems</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CBB994] mb-2">Zero</div>
                <p className="text-gray-300">Tolerance Policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About8;
