import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin, Phone, Mail } from "lucide-react";
import { useEffect } from "react";

const Contact3 = () => {
  useEffect(() => {
    document.title = "Global Offices | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Arms Complex operates globally with offices in North America, Europe, Asia, and beyond. Find your regional contact information.');
    }
  }, []);

  const offices = [
    {
      region: "North America",
      locations: [
        { city: "Virginia, USA", phone: "+1 (555) 123-4567", email: "usa@armscomplex.com" },
        { city: "Toronto, Canada", phone: "+1 (416) 555-0123", email: "canada@armscomplex.com" }
      ]
    },
    {
      region: "Europe",
      locations: [
        { city: "London, UK", phone: "+44 20 7123 4567", email: "uk@armscomplex.com" },
        { city: "Berlin, Germany", phone: "+49 30 1234 5678", email: "germany@armscomplex.com" },
        { city: "Paris, France", phone: "+33 1 23 45 67 89", email: "france@armscomplex.com" }
      ]
    },
    {
      region: "Asia Pacific",
      locations: [
        { city: "Singapore", phone: "+65 6123 4567", email: "singapore@armscomplex.com" },
        { city: "Tokyo, Japan", phone: "+81 3 1234 5678", email: "japan@armscomplex.com" }
      ]
    },
    {
      region: "Middle East",
      locations: [
        { city: "Dubai, UAE", phone: "+971 4 123 4567", email: "uae@armscomplex.com" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-[#000000] via-[#2E2E2E] to-[#556B2F]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-[#CBB994] text-black">WORLDWIDE PRESENCE</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase font-['Oswald']">Global Offices</h1>
          <p className="text-xl text-gray-200">Serving customers across 6 continents</p>
        </div>
      </section>

      {/* Global Map Visual */}
      <section className="py-20 bg-gradient-to-br from-[#556B2F]/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Globe className="h-16 w-16 mx-auto mb-4 text-[#556B2F]" />
            <h2 className="text-4xl font-bold mb-4 uppercase font-['Oswald']">Our Global Network</h2>
            <p className="text-muted-foreground text-lg">Operating in 50+ countries worldwide</p>
          </div>
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

      {/* Office Locations */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {offices.map((office, idx) => (
            <div key={idx}>
              <h2 className="text-3xl font-bold mb-6 uppercase font-['Oswald'] text-[#556B2F]">{office.region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {office.locations.map((location, locIdx) => (
                  <Card key={locIdx} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#556B2F]">
                    <CardContent className="p-6">
                      <MapPin className="h-8 w-8 mb-4 text-[#556B2F]" />
                      <h3 className="text-xl font-bold mb-4">{location.city}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${location.email}`} className="text-sm hover:text-[#556B2F]">
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distributor CTA */}
      <section className="bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white uppercase font-['Oswald']">Need a Local Distributor?</h2>
          <p className="text-gray-300 mb-8 text-lg">Contact our global sales team to find an authorized distributor near you</p>
          <a href="mailto:sales@armscomplex.com">
            <button className="bg-[#CBB994] hover:bg-[#CBB994]/90 text-black font-semibold px-8 py-3 rounded">
              Locate a Distributor
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact3;
