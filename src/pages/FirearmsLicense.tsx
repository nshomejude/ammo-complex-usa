import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, AlertTriangle, HelpCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ContactWidget } from "@/components/ContactWidget";

const FirearmsLicense = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Firearms License Information</h1>
          <p className="text-muted-foreground text-lg">
            Understanding ammunition purchase requirements, federal firearms licenses, and state-specific regulations.
          </p>
        </div>

        <Alert className="mb-8 border-destructive bg-destructive/10">
          <Shield className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Federal Compliance Required</AlertTitle>
          <AlertDescription>
            Arms Complex operates under Federal Firearms License (FFL) regulations. All customers must comply with federal, state, and local laws regarding ammunition purchases.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <FileCheck className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Federal Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Age Requirements</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li><strong>Handgun ammunition:</strong> Must be 21 years or older</li>
                  <li><strong>Rifle/Shotgun ammunition:</strong> Must be 18 years or older</li>
                  <li><strong>Rimfire ammunition:</strong> Must be 18 years or older</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Required Documentation</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Valid government-issued photo ID (Driver's License, Passport, State ID)</li>
                  <li>Proof of current residence</li>
                  <li>State-specific permits (where applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Prohibited Persons</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Federal law prohibits ammunition sales to individuals who:
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Are convicted felons</li>
                  <li>Are fugitives from justice</li>
                  <li>Are unlawful users of controlled substances</li>
                  <li>Have been adjudicated as mental defectives</li>
                  <li>Are subject to restraining orders</li>
                  <li>Have been convicted of domestic violence</li>
                  <li>Are illegal aliens or non-immigrant visa holders</li>
                  <li>Have renounced U.S. citizenship</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <Shield className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>State-Specific Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">States Requiring Additional Permits</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Connecticut</p>
                    <p className="text-xs text-muted-foreground">Ammunition Certificate or valid carry permit required</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">Illinois</p>
                    <p className="text-xs text-muted-foreground">Valid FOID (Firearm Owner's Identification) card required</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">Massachusetts</p>
                    <p className="text-xs text-muted-foreground">Valid FID (Firearm Identification) card or LTC (License to Carry) required</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">New Jersey</p>
                    <p className="text-xs text-muted-foreground">Valid FID card and separate Permit to Purchase required</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">New York</p>
                    <p className="text-xs text-muted-foreground">Valid pistol permit (for handgun ammo) or background check</p>
                  </div>
                </div>
              </div>

              <Alert className="border-destructive bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-sm">
                  <strong>California Notice:</strong> Direct-to-consumer ammunition sales are prohibited. California residents must purchase through an FFL dealer.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <HelpCircle className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Verification Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">How We Verify</h3>
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground ml-2">
                  <li>Upload clear copies of required documents during checkout</li>
                  <li>Our compliance team reviews all documentation</li>
                  <li>Age verification through ID validation</li>
                  <li>Address verification against shipping location</li>
                  <li>State permit/license verification (where required)</li>
                  <li>Cross-reference against prohibited persons databases</li>
                  <li>Approval notification sent via email (1-3 business days)</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Document Upload Guidelines</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Clear, high-resolution images or scans</li>
                  <li>All text must be legible</li>
                  <li>Documents must be current and not expired</li>
                  <li>Full document visible in frame</li>
                  <li>Accepted formats: JPG, PNG, PDF</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tactical/10">
                  <CheckCircle className="h-6 w-6 text-tactical" />
                </div>
                <CardTitle>Background Check Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">When Background Checks Apply</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Some states require background checks for ammunition purchases:
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>California (through licensed dealer)</li>
                  <li>New York (through dealer or state system)</li>
                  <li>Connecticut (ammunition certificate holders exempt)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Background Check Process</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Instant electronic verification</li>
                  <li>Results typically within minutes to hours</li>
                  <li>Additional $5-$10 fee per transaction</li>
                  <li>Valid for single purchase (not transferable)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">If Your Check is Delayed</h3>
                <p className="text-sm text-muted-foreground">
                  If a background check is delayed, we will hold your order for up to 10 business days pending resolution. You will be notified of any issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-tactical/30 bg-tactical/5 mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-tactical" />
              Our Federal Firearms License
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>
                Arms Complex operates under Federal Firearms License (FFL) Type 01 - Dealer in Firearms Other Than Destructive Devices.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm"><strong>FFL Number:</strong> 1-XX-XXX-XX-XX-XXXXX</p>
                  <p className="text-sm"><strong>License Type:</strong> Type 01 Dealer</p>
                  <p className="text-sm"><strong>Issue Date:</strong> January 15, 2020</p>
                </div>
                <div>
                  <p className="text-sm"><strong>Issued By:</strong> Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF)</p>
                  <p className="text-sm"><strong>Compliance Officer:</strong> John Smith</p>
                  <p className="text-sm"><strong>Status:</strong> Active & Current</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="border-destructive bg-destructive/10 mb-6">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Important Legal Notice</AlertTitle>
          <AlertDescription>
            By purchasing ammunition from Arms Complex, you certify that you are legally permitted to purchase and possess ammunition under all applicable federal, state, and local laws. Providing false information is a federal crime punishable by imprisonment and fines.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-tactical/30 bg-tactical/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Questions About Licensing?</h3>
                <p className="text-muted-foreground">
                  Our team is available to help you understand the requirements for your specific situation and location.
                </p>
              </CardContent>
            </Card>
          </div>
          <ContactWidget variant="compact" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FirearmsLicense;