import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Navigation as NavigationIcon } from "lucide-react";
import { useEffect } from "react";

const Contact5 = () => {
  useEffect(() => {
    document.title = "Visit Our Facility | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Plan your visit to Arms Complex headquarters and manufacturing facility in Virginia. Find our address, hours, and directions.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#000000]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">VISIT US</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Visit Our Facility</h1>
          <p className="text-xl text-gray-200">See where excellence is manufactured</p>
        </div>
      </section>

      {/* Contact Widgets */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ContactWidget1 />
          <ContactWidget2 />
          <ContactWidget3 />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Facility Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 uppercase font-['Oswald']">Headquarters & Manufacturing</h2>
            
            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3 font-['Oswald']">Address</h3>
                <p className="text-lg mb-2">Arms Complex International</p>
                <p className="text-muted-foreground">
                  1250 Defense Boulevard<br />
                  Virginia, VA 22303<br />
                  United States of America
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3 font-['Oswald']">Facility Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3 font-['Oswald']">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="tel:+15551234567" className="text-[#556B2F] font-semibold">+1 (555) 123-4567</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:facility@armscomplex.com" className="text-[#556B2F] font-semibold">facility@armscomplex.com</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#556B2F] bg-gradient-to-br from-[#556B2F]/10 to-background">
              <CardContent className="p-6">
                <NavigationIcon className="h-8 w-8 mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-3 font-['Oswald']">Visitor Information</h3>
                <p className="text-muted-foreground mb-4">
                  Tours are available by appointment only. Please contact us at least 48 hours in advance 
                  to schedule your visit. Valid ID required for entry.
                </p>
                <a href="mailto:facility@armscomplex.com">
                  <button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90 text-white px-6 py-3 rounded font-semibold">
                    Schedule a Visit
                  </button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-[#2E2E2E] via-[#556B2F] to-[#2E2E2E] rounded-lg h-[700px] flex items-center justify-center">
              <div className="text-center text-white p-8">
                <MapPin className="h-32 w-32 mx-auto mb-6 text-[#CBB994]" />
                <h3 className="text-3xl font-bold mb-4 font-['Oswald']">Find Us Here</h3>
                <p className="text-xl text-gray-300 mb-2">1250 Defense Boulevard</p>
                <p className="text-lg text-gray-400">Virginia, VA 22303</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact5;
