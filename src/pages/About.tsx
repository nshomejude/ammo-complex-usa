import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, MapPin, AlertTriangle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Legal Requirements & Compliance</h1>
          <p className="text-muted-foreground text-lg">
            Arms Complex is a federally licensed firearms dealer committed to legal and responsible ammunition sales.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <Shield className="h-6 w-6 text-tactical" />
                </div>
                <h2 className="text-2xl font-bold">FFL Requirements</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>All ammunition sales require:</p>
                <ul className="list-inside list-disc space-y-2 ml-2">
                  <li>Valid government-issued photo ID</li>
                  <li>Proof of residency in a legal state</li>
                  <li>Firearms license verification (where applicable)</li>
                  <li>Age verification (21+ for handgun ammo, 18+ for rifle/shotgun)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <MapPin className="h-6 w-6 text-tactical" />
                </div>
                <h2 className="text-2xl font-bold">Shipping Restrictions</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>We ship only to states where legal:</p>
                <ul className="list-inside list-disc space-y-2 ml-2">
                  <li>No shipping to prohibited states or localities</li>
                  <li>Adult signature required on delivery</li>
                  <li>Compliance with state quantity limits</li>
                  <li>Proper hazmat shipping procedures followed</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <FileText className="h-6 w-6 text-tactical" />
                </div>
                <h2 className="text-2xl font-bold">Purchase Process</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>How to complete your order:</p>
                <ol className="list-inside list-decimal space-y-2 ml-2">
                  <li>Browse and select ammunition</li>
                  <li>Create account with identity verification</li>
                  <li>Submit required documentation</li>
                  <li>Complete background check (if required)</li>
                  <li>Payment processing and shipment</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <h2 className="text-2xl font-bold">Important Notices</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-inside list-disc space-y-2 ml-2">
                  <li>All sales are final once shipped</li>
                  <li>False information will result in order cancellation</li>
                  <li>We reserve the right to refuse any sale</li>
                  <li>Compliance with all federal, state, and local laws required</li>
                  <li>Access restricted to US-based, legal purchasers only</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-tactical/30 bg-tactical/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">Contact Information</h3>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Federal Firearms License:</strong> [FFL Number]</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              <p><strong>Email:</strong> sales@armscomplex.com</p>
              <p><strong>Phone:</strong> 1-800-ARMS-COMPLEX</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;
