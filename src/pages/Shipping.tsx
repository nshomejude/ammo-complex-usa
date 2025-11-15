import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, MapPin, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ContactWidget } from "@/components/ContactWidget";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-muted-foreground text-lg">
            Learn about our shipping policies, delivery times, and important ammunition shipping requirements.
          </p>
        </div>

        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">Ammunition Shipping Notice</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            Ammunition requires special hazardous materials (HazMat) shipping procedures. Adult signature required upon delivery. Additional fees may apply.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <MapPin className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Shipping Restrictions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Prohibited States & Localities</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  We cannot ship ammunition to the following locations:
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>California (direct-to-consumer prohibited)</li>
                  <li>Connecticut (permit required)</li>
                  <li>Illinois (FOID card required)</li>
                  <li>Massachusetts (FID card required)</li>
                  <li>New Jersey (FID card required)</li>
                  <li>New York (permit required)</li>
                  <li>Washington D.C. (prohibited)</li>
                  <li>Alaska, Hawaii (special restrictions apply)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Additional Local Restrictions</h3>
                <p className="text-sm text-muted-foreground">
                  Some cities and counties have additional restrictions. Please verify your local laws before ordering.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <Clock className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Delivery Times</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Processing Time</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Order verification: 1-2 business days</li>
                  <li>License verification: 1-3 business days</li>
                  <li>Packaging and fulfillment: 1-2 business days</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Shipping Methods</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li><strong>Standard Ground:</strong> 3-7 business days</li>
                  <li><strong>Expedited:</strong> 2-3 business days</li>
                  <li><strong>Express:</strong> 1-2 business days (where available)</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  * Delivery times may vary based on location and carrier availability
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <DollarSign className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Shipping Costs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Base Shipping Rates</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Orders under 50 lbs: $25.00</li>
                  <li>Orders 50-100 lbs: $35.00</li>
                  <li>Orders over 100 lbs: $45.00+</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">HazMat Fees</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All ammunition shipments require HazMat handling:
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>HazMat service fee: $30.00-$40.00</li>
                  <li>Adult signature confirmation: Included</li>
                  <li>Insurance: Optional (recommended)</li>
                </ul>
              </div>

              <Alert className="border-tactical/30 bg-tactical/5">
                <CheckCircle className="h-4 w-4 text-tactical" />
                <AlertDescription className="text-sm">
                  <strong>FREE SHIPPING</strong> on orders over $500 (HazMat fees still apply)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <Package className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Delivery Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Signature Required</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All ammunition deliveries require:
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Adult signature (21+ years of age)</li>
                  <li>Valid government-issued photo ID</li>
                  <li>Recipient must be present at delivery</li>
                  <li>No deliveries to P.O. Boxes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Refused or Failed Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  If delivery fails due to age verification, absence of recipient, or refusal to sign, the package will be returned. Return shipping and restocking fees may apply.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-tactical/30 bg-tactical/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Package className="h-5 w-5 text-tactical" />
                Package Tracking
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  Once your order ships, you will receive a tracking number via email. You can track your shipment through:
                </p>
                <ul className="list-inside list-disc space-y-1 ml-2">
                  <li>Your Arms Complex account dashboard</li>
                  <li>Direct carrier tracking (UPS, FedEx)</li>
                  <li>Email notifications at key delivery milestones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <ContactWidget variant="compact" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;