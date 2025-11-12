import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Admin = () => {
  const [blockedCountries, setBlockedCountries] = useState<string[]>([
    "CN", "RU", "KP", "IR", "SY"
  ]);
  const [newCountry, setNewCountry] = useState("");

  const countryNames: { [key: string]: string } = {
    CN: "China",
    RU: "Russia",
    KP: "North Korea",
    IR: "Iran",
    SY: "Syria",
  };

  const addCountry = () => {
    if (newCountry.length === 2 && !blockedCountries.includes(newCountry.toUpperCase())) {
      setBlockedCountries([...blockedCountries, newCountry.toUpperCase()]);
      setNewCountry("");
      toast.success("Country blocked successfully");
    } else {
      toast.error("Invalid country code or already blocked");
    }
  };

  const removeCountry = (code: string) => {
    setBlockedCountries(blockedCountries.filter(c => c !== code));
    toast.success("Country unblocked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Shield className="h-8 w-8 text-tactical" />
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage geo-restrictions and site access</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-tactical" />
                Country Restrictions
              </CardTitle>
              <CardDescription>
                Block access from specific countries. Users from blocked regions cannot access the site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex gap-2">
                <Input
                  placeholder="Country Code (e.g., CN)"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value.toUpperCase())}
                  maxLength={2}
                  className="max-w-xs"
                />
                <Button onClick={addCountry} className="bg-tactical hover:bg-tactical/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Block
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Blocked Countries ({blockedCountries.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {blockedCountries.map((code) => (
                    <Badge key={code} variant="outline" className="border-destructive text-destructive pr-1">
                      <span className="mr-2">
                        {code} {countryNames[code] ? `(${countryNames[code]})` : ""}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive/10"
                        onClick={() => removeCountry(code)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-warning/10 border border-warning/30 p-4">
                <p className="text-sm text-warning-foreground">
                  <strong>Note:</strong> VPN detection requires additional backend integration. 
                  Current blocking is based on geolocation IP detection. For enhanced security, 
                  consider implementing VPN/proxy detection services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Statistics</CardTitle>
              <CardDescription>Monitor blocked access attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-tactical">247</div>
                  <div className="text-sm text-muted-foreground">Blocked Attempts (24h)</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-tactical">1,834</div>
                  <div className="text-sm text-muted-foreground">Blocked This Month</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-tactical">5</div>
                  <div className="text-sm text-muted-foreground">Active Blocks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
