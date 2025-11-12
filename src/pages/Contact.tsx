import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions? Our team is here to help with your ammunition needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <Card className="border-tactical/30">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tactical/10">
                <Phone className="h-8 w-8 text-tactical" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-3">Call us for immediate assistance</p>
              <p className="text-lg font-semibold text-tactical">1-800-ARMS-COMPLEX</p>
              <p className="text-sm text-muted-foreground mt-1">(1-800-276-7266)</p>
            </CardContent>
          </Card>

          <Card className="border-tactical/30">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tactical/10">
                <Mail className="h-8 w-8 text-tactical" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-3">Send us a detailed message</p>
              <p className="text-sm font-semibold text-tactical break-all">support@armscomplex.com</p>
              <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="border-tactical/30">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tactical/10">
                <Clock className="h-8 w-8 text-tactical" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <p className="text-muted-foreground mb-3">We're available to help</p>
              <p className="text-sm font-semibold">Monday - Friday</p>
              <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM EST</p>
              <p className="text-sm text-muted-foreground mt-1">Closed Weekends & Holidays</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-tactical" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[150px]"
                    required 
                  />
                </div>

                <Button type="submit" className="w-full bg-tactical hover:bg-tactical/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-tactical" />
                  Location & Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Arms Complex LLC</p>
                  <p className="text-sm text-muted-foreground">123 Tactical Drive</p>
                  <p className="text-sm text-muted-foreground">Suite 500</p>
                  <p className="text-sm text-muted-foreground">Phoenix, AZ 85001</p>
                  <p className="text-sm text-muted-foreground">United States</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> We are an online-only retailer. No walk-in retail location available. All sales must be processed through our website.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-tactical" />
                  Federal License Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>FFL Number:</strong> 1-XX-XXX-XX-XX-XXXXX
                </p>
                <p className="text-sm">
                  <strong>License Type:</strong> Type 01 Dealer
                </p>
                <p className="text-sm">
                  <strong>Issued By:</strong> Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF)
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> Active & Current
                </p>
              </CardContent>
            </Card>

            <Card className="border-tactical/30 bg-tactical/5">
              <CardHeader>
                <CardTitle>Specialized Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">Bulk Orders & Dealer Inquiries</p>
                  <p className="text-muted-foreground">wholesale@armscomplex.com</p>
                </div>
                <div>
                  <p className="font-semibold">Shipping & Tracking</p>
                  <p className="text-muted-foreground">shipping@armscomplex.com</p>
                </div>
                <div>
                  <p className="font-semibold">Compliance & Legal</p>
                  <p className="text-muted-foreground">compliance@armscomplex.com</p>
                </div>
                <div>
                  <p className="font-semibold">Account & Technical Support</p>
                  <p className="text-muted-foreground">tech@armscomplex.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Before contacting us, you may find answers to common questions in our help sections:
                </p>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground ml-2">
                  <li>Shipping policies and delivery times</li>
                  <li>Firearms license requirements by state</li>
                  <li>Step-by-step purchase guide</li>
                  <li>Product specifications and availability</li>
                  <li>Return and refund policies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;