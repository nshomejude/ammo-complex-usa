import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect } from "react";

const Contact9 = () => {
  useEffect(() => {
    document.title = "Regional Hubs | Arms Complex";
  }, []);

  const hubs = [
    { region: "East Coast", phone: "+1 (555) 100-0001", email: "east@armscomplex.com" },
    { region: "West Coast", phone: "+1 (555) 100-0002", email: "west@armscomplex.com" },
    { region: "Midwest", phone: "+1 (555) 100-0003", email: "midwest@armscomplex.com" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Contact Widgets */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ContactWidget1 />
          <ContactWidget2 />
          <ContactWidget3 />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hubs.map((hub, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mb-4 text-[#556B2F]" />
                <h3 className="text-xl font-bold mb-4">{hub.region}</h3>
                <div className="space-y-2">
                  <a href={`tel:${hub.phone}`} className="block text-[#556B2F]">{hub.phone}</a>
                  <a href={`mailto:${hub.email}`} className="block text-[#556B2F]">{hub.email}</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact9;
