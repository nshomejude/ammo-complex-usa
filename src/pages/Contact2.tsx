import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect } from "react";

const Contact2 = () => {
  useEffect(() => {
    document.title = "Reach Us | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Contact Arms Complex for firearms, ammunition, and defense equipment inquiries. Visit our headquarters in Virginia or reach us by phone and email.');
    }
  }, []);

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

      {/* Contact Info */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold mb-8 uppercase font-['Oswald']">Get In Touch</h2>
            
            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#556B2F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Headquarters Address</h3>
                    <p className="text-muted-foreground">
                      Arms Complex International<br />
                      1250 Defense Boulevard<br />
                      Virginia, VA 22303<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#556B2F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Phone Numbers</h3>
                    <p className="text-muted-foreground">
                      Sales: +1 (555) 123-4567<br />
                      Support: +1 (555) 123-4568<br />
                      Corporate: +1 (555) 123-4569
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#556B2F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Email Addresses</h3>
                    <p className="text-muted-foreground">
                      General: info@armscomplex.com<br />
                      Sales: sales@armscomplex.com<br />
                      Support: support@armscomplex.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#556B2F]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-[#556B2F] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                      Saturday: 9:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <a href="tel:+15551234567">
                <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white w-full mb-4">
                  <Phone className="mr-2 h-5 w-5" /> Call Our Sales Office
                </Button>
              </a>
              <a href="mailto:sales@armscomplex.com">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-5 w-5" /> Email Us
                </Button>
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <div className="bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] rounded-lg h-[600px] flex items-center justify-center">
              <div className="text-center text-white p-8">
                <MapPin className="h-24 w-24 mx-auto mb-4 text-[#CBB994]" />
                <h3 className="text-2xl font-bold mb-4 font-['Oswald']">Visit Our Headquarters</h3>
                <p className="text-gray-300">1250 Defense Boulevard, Virginia, VA 22303</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact2;
