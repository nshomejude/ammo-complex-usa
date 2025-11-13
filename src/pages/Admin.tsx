import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Globe, Trash2, Plus, Edit2, Save, Presentation } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
}

const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Ammunition for Licensed Buyers",
    description: "Shop quality ammo with FFL verification and compliance"
  },
  {
    id: 2,
    title: "Trusted by Law-Abiding Gun Owners",
    description: "Secure purchases with verified firearms licenses"
  },
  {
    id: 3,
    title: "Top Brands - Federal, Hornady & More",
    description: "Authorized dealer offering competitive pricing"
  },
  {
    id: 4,
    title: "Fast & Legal Ammunition Shipping",
    description: "Compliant delivery to all eligible states"
  }
];

const Admin = () => {
  const [blockedCountries, setBlockedCountries] = useState<string[]>([
    "CN", "RU", "KP", "IR", "SY"
  ]);
  const [newCountry, setNewCountry] = useState("");
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const savedSlides = localStorage.getItem('heroSlides');
    if (savedSlides) {
      setHeroSlides(JSON.parse(savedSlides));
    }
  }, []);

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

  const startEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide.id);
    setEditTitle(slide.title);
    setEditDescription(slide.description);
  };

  const saveSlide = () => {
    if (editTitle.trim() && editDescription.trim() && editDescription.length <= 50) {
      const updatedSlides = heroSlides.map(slide =>
        slide.id === editingSlide
          ? { ...slide, title: editTitle, description: editDescription }
          : slide
      );
      setHeroSlides(updatedSlides);
      localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
      setEditingSlide(null);
      toast.success("Hero slide updated successfully");
    } else {
      toast.error("Title required and description must be ≤50 characters");
    }
  };

  const addNewSlide = () => {
    const newSlide: HeroSlide = {
      id: Math.max(...heroSlides.map(s => s.id)) + 1,
      title: "New Slide Title",
      description: "New description (max 50 characters)"
    };
    const updatedSlides = [...heroSlides, newSlide];
    setHeroSlides(updatedSlides);
    localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
    toast.success("New slide added");
  };

  const deleteSlide = (id: number) => {
    if (heroSlides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }
    const updatedSlides = heroSlides.filter(slide => slide.id !== id);
    setHeroSlides(updatedSlides);
    localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
    toast.success("Slide deleted");
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
                <Presentation className="h-5 w-5 text-tactical" />
                Hero Slides Manager
              </CardTitle>
              <CardDescription>
                Edit hero section slides. Descriptions must be ≤50 characters for optimal display.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={addNewSlide} className="bg-tactical hover:bg-tactical/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Slide
                </Button>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="rounded-lg border-2 border-border bg-card p-4">
                    {editingSlide === slide.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Enter slide title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Description ({editDescription.length}/50 characters)
                          </label>
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Enter slide description (max 50 characters)"
                            maxLength={50}
                            rows={2}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={saveSlide} size="sm" className="bg-tactical hover:bg-tactical/90">
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                          <Button 
                            onClick={() => setEditingSlide(null)} 
                            size="sm" 
                            variant="outline"
                            className="border-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{slide.title}</h3>
                          <p className="text-sm text-muted-foreground">{slide.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {slide.description.length} characters
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEditSlide(slide)}
                            size="sm"
                            variant="outline"
                            className="border-2"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteSlide(slide.id)}
                            size="sm"
                            variant="outline"
                            className="border-2 border-destructive text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
