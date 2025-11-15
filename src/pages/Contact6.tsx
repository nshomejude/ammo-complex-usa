import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, Users } from "lucide-react";
import { useEffect } from "react";

const Contact6 = () => {
  useEffect(() => {
    document.title = "Corporate Communication | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Contact Arms Complex corporate office for business inquiries, media relations, and partnership opportunities.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      {/* Contact Widgets */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ContactWidget1 />
            <ContactWidget2 />
            <ContactWidget3 />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-8">
                <Building2 className="h-12 w-12 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Corporate Office</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold text-foreground">Arms Complex International</p>
                  <p>1250 Defense Boulevard</p>
                  <p>Virginia, VA 22303</p>
                  <p>United States</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Phone</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Main Line</p>
                    <a href="tel:+15551234570" className="text-lg font-semibold text-[#556B2F]">
                      +1 (555) 123-4570
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Executive Office</p>
                    <a href="tel:+15551234571" className="text-lg font-semibold text-[#556B2F]">
                      +1 (555) 123-4571
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-8">
                <Mail className="h-10 w-10 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Corporate Inquiries</h3>
                <p className="text-muted-foreground mb-4">
                  For business partnerships, supplier inquiries, and corporate matters
                </p>
                <a href="mailto:corporate@armscomplex.com" className="text-lg text-[#556B2F] font-semibold hover:underline">
                  corporate@armscomplex.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-8">
                <Users className="h-10 w-10 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Media & Public Relations</h3>
                <p className="text-muted-foreground mb-4">
                  Press inquiries, interviews, and media resources
                </p>
                <a href="mailto:press@armscomplex.com" className="text-lg text-[#556B2F] font-semibold hover:underline">
                  press@armscomplex.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-8">
                <Mail className="h-10 w-10 mb-4 text-[#556B2F]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Investor Relations</h3>
                <p className="text-muted-foreground mb-4">
                  Financial information and investor inquiries
                </p>
                <a href="mailto:investors@armscomplex.com" className="text-lg text-[#556B2F] font-semibold hover:underline">
                  investors@armscomplex.com
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <a href="mailto:corporate@armscomplex.com">
              <button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-8 py-4 rounded text-lg font-semibold">
                <Mail className="inline-block mr-2 h-5 w-5" />
                Email Corporate Relations
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact6;
