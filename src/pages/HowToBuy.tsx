import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, UserPlus, FileCheck, CreditCard, Package, CheckCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ContactWidget } from "@/components/ContactWidget";

const HowToBuy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">How to Buy Ammunition</h1>
          <p className="text-muted-foreground text-lg">
            Follow our simple step-by-step guide to purchase ammunition safely and legally from Arms Complex.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Purchase Process</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="border-tactical/30">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tactical text-tactical-foreground">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Create Your Account
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 ml-16">
                  <p className="text-muted-foreground">
                    Register for a free Arms Complex account to begin your purchase:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground ml-2">
                    <li>Provide your full legal name</li>
                    <li>Enter a valid email address</li>
                    <li>Create a secure password</li>
                    <li>Verify your email address through confirmation link</li>
                    <li>Complete your profile with shipping address</li>
                  </ul>
                  <div className="pt-2">
                    <Button className="bg-tactical hover:bg-tactical/90">
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-tactical/30">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tactical text-tactical-foreground">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Verify Your Identity
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 ml-16">
                  <p className="text-muted-foreground">
                    Upload required documentation for identity and age verification:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Required Documents:</h4>
                      <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground ml-2">
                        <li><strong>Government-issued photo ID</strong> (Driver's License, State ID, or Passport)</li>
                        <li><strong>Proof of residence</strong> (utility bill, lease agreement, or matching ID address)</li>
                        <li><strong>State-specific permits</strong> (if required in your state)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Document Requirements:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                        <li>Clear, high-resolution images or PDFs</li>
                        <li>All text must be legible and not obscured</li>
                        <li>Documents must be current and not expired</li>
                        <li>Full document visible in photo</li>
                      </ul>
                    </div>

                    <Alert className="border-tactical/30 bg-tactical/5">
                      <CheckCircle className="h-4 w-4 text-tactical" />
                      <AlertDescription className="text-sm">
                        Verification typically takes 1-3 business days. You'll receive an email when approved.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-tactical/30">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tactical text-tactical-foreground">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Browse & Select Products
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 ml-16">
                  <p className="text-muted-foreground">
                    Once verified, browse our extensive ammunition catalog:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground ml-2">
                    <li>Browse by caliber, brand, or category</li>
                    <li>Read detailed product specifications</li>
                    <li>Check real-time inventory availability</li>
                    <li>Compare prices and bulk discounts</li>
                    <li>Add items to your shopping cart</li>
                    <li>Apply any available promotional codes</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/products">
                      <Button variant="outline" className="border-tactical text-tactical hover:bg-tactical hover:text-tactical-foreground">
                        Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-tactical/30">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tactical text-tactical-foreground">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Checkout & Payment
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 ml-16">
                  <p className="text-muted-foreground">
                    Complete your purchase with our secure checkout process:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Accepted Payment Methods:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                        <li>Credit Cards (Visa, Mastercard, American Express, Discover)</li>
                        <li>Debit Cards</li>
                        <li>PayPal</li>
                        <li>Wire Transfer (for large orders)</li>
                        <li>Certified Check or Money Order</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Order Review:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                        <li>Verify shipping address</li>
                        <li>Review all items and quantities</li>
                        <li>Confirm shipping method and costs</li>
                        <li>Check applicable taxes and fees</li>
                        <li>Review and accept terms & conditions</li>
                        <li>Certify legal eligibility to purchase</li>
                      </ul>
                    </div>

                    <Alert className="border-tactical/30 bg-tactical/5">
                      <CheckCircle className="h-4 w-4 text-tactical" />
                      <AlertDescription className="text-sm">
                        All transactions are secured with 256-bit SSL encryption. Your payment information is never stored on our servers.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="border-tactical/30">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tactical text-tactical-foreground">
                    <span className="text-xl font-bold">5</span>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Shipping & Delivery
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 ml-16">
                  <p className="text-muted-foreground">
                    Track your order from warehouse to doorstep:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Order Processing:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                        <li>Order confirmation email sent immediately</li>
                        <li>Final compliance review (1-2 business days)</li>
                        <li>Packaging and fulfillment preparation</li>
                        <li>Shipping carrier pickup</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-foreground">Delivery Information:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                        <li>Tracking number provided via email</li>
                        <li>Real-time shipment tracking available</li>
                        <li>Adult signature required (21+ years)</li>
                        <li>Government-issued ID must be presented</li>
                        <li>Delivery attempts for 3 consecutive days</li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Link to="/shipping">
                        <Button variant="outline" className="border-tactical text-tactical hover:bg-tactical hover:text-tactical-foreground">
                          View Shipping Policies <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground ml-2">
                <li>You must be 18+ for rifle/shotgun ammunition, 21+ for handgun ammunition</li>
                <li>Account verification is required before first purchase</li>
                <li>All documentation must be current and not expired</li>
                <li>Shipping restrictions apply based on your state and local laws</li>
                <li>HazMat fees apply to all ammunition shipments</li>
                <li>Adult signature required for all deliveries</li>
                <li>All sales are final once shipped</li>
                <li>Providing false information is a federal crime</li>
              </ul>
            </CardContent>
          </Card>

          <ContactWidget variant="compact" />
        </div>

        <Card className="border-tactical/30 bg-tactical/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Create your account today and get verified to start purchasing high-quality ammunition from Arms Complex.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-tactical hover:bg-tactical/90">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/products">
                <Button variant="outline" className="border-tactical text-tactical hover:bg-tactical hover:text-tactical-foreground">
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default HowToBuy;