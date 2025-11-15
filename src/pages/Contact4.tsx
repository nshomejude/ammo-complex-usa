import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactWidget1 } from "@/components/ContactWidget1";
import { ContactWidget2 } from "@/components/ContactWidget2";
import { ContactWidget3 } from "@/components/ContactWidget3";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useEffect } from "react";

const Contact4 = () => {
  useEffect(() => {
    document.title = "Talk to Us | Arms Complex";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Get in touch with Arms Complex. Contact us by phone or email for firearms inquiries, quotes, and customer support.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />


      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Contact Widgets */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <ContactWidget1 />
            <ContactWidget2 />
            <ContactWidget3 />
          </div>

          <div className="text-center mb-16">
            <MessageSquare className="h-16 w-16 mx-auto mb-6 text-[#556B2F]" />
            <h2 className="text-4xl font-bold mb-6 uppercase font-['Oswald']">Contact Information</h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred method of communication below
            </p>
          </div>

          <div className="space-y-8">
            {/* Phone */}
            <div className="bg-gradient-to-r from-[#556B2F]/10 to-transparent p-8 rounded-lg border-l-4 border-l-[#556B2F]">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="h-12 w-12 text-[#556B2F]" />
                <div>
                  <h3 className="text-2xl font-bold font-['Oswald']">Call Us</h3>
                  <p className="text-muted-foreground">Monday - Friday, 8 AM - 6 PM EST</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Sales Inquiries:</span>
                  <a href="tel:+15551234567" className="text-xl font-bold text-[#556B2F]">+1 (555) 123-4567</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Customer Support:</span>
                  <a href="tel:+15551234568" className="text-xl font-bold text-[#556B2F]">+1 (555) 123-4568</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Technical Support:</span>
                  <a href="tel:+15551234569" className="text-xl font-bold text-[#556B2F]">+1 (555) 123-4569</a>
                </div>
              </div>
              <a href="tel:+15551234567">
                <Button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90 text-white">
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </Button>
              </a>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-r from-[#2E2E2E]/10 to-transparent p-8 rounded-lg border-l-4 border-l-[#2E2E2E]">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="h-12 w-12 text-[#2E2E2E]" />
                <div>
                  <h3 className="text-2xl font-bold font-['Oswald']">Email Us</h3>
                  <p className="text-muted-foreground">We respond within 24 hours</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">General Inquiries:</span>
                  <a href="mailto:info@armscomplex.com" className="text-lg text-[#556B2F] hover:underline">
                    info@armscomplex.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Sales:</span>
                  <a href="mailto:sales@armscomplex.com" className="text-lg text-[#556B2F] hover:underline">
                    sales@armscomplex.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Support:</span>
                  <a href="mailto:support@armscomplex.com" className="text-lg text-[#556B2F] hover:underline">
                    support@armscomplex.com
                  </a>
                </div>
              </div>
              <a href="mailto:info@armscomplex.com">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-5 w-5" /> Send an Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact4;
