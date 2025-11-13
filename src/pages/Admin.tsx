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

interface HeroBackground {
  fromColor: string;
  viaColor: string;
  toColor: string;
}

interface HeroTextColors {
  titleColor: string;
  descriptionColor: string;
}

const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Ammunition for Licensed Buyers",
    description: "Shop our extensive selection of premium ammunition from trusted manufacturers including Federal, Hornady, Winchester, and Speer. Every purchase requires FFL verification and full compliance with federal and state regulations. We stock pistol, rifle, and shotgun ammunition for training, competition, and personal defense. Fast shipping, competitive pricing, and expert customer support ensure you get exactly what you need. All products are authentic and backed by manufacturer warranties."
  },
  {
    id: 2,
    title: "Trusted by Law-Abiding Gun Owners Nationwide",
    description: "Join thousands of satisfied customers who rely on ARMS COMPLEX for their ammunition needs. We verify all firearms licenses to ensure legal compliance and secure transactions. Our commitment to responsible gun ownership means we only sell to eligible buyers. Browse our real-time inventory with instant availability updates. Orders ship within 24 hours with full tracking and secure packaging. Experience the difference of working with a licensed FFL dealer who understands your requirements and prioritizes safety."
  },
  {
    id: 3,
    title: "Top Brands - Federal, Hornady, Winchester & More",
    description: "As an authorized dealer for America's leading ammunition manufacturers, we guarantee authentic products at competitive prices. Stock includes Federal Premium HST, Hornady Critical Duty, Winchester Ranger, Speer Gold Dot, and more professional-grade loads. Whether you need defensive carry ammunition, competition rounds, or training supplies, our curated selection meets the highest standards. Bulk discounts available. Regular sales and promotions help you save on premium ammunition. Expert staff available to help you choose the right load for your specific needs."
  },
  {
    id: 4,
    title: "Fast & Legal Ammunition Shipping to Your Door",
    description: "We ship ammunition to all states where legally permitted with full compliance documentation. Orders placed before 2 PM ship the same business day with tracking. Secure packaging ensures your ammunition arrives safely and discreetly. We handle all compliance requirements so you can shop with confidence. Free shipping available on qualifying orders. Our streamlined checkout process makes ordering quick and easy. Licensed, insured, and committed to providing the best service in the industry for law-abiding gun owners."
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
  const [heroBackground, setHeroBackground] = useState<HeroBackground>({
    fromColor: "0, 75%, 96%",
    viaColor: "0, 0%, 100%",
    toColor: "0, 0%, 100%"
  });
  const [heroTextColors, setHeroTextColors] = useState<HeroTextColors>({
    titleColor: "var(--home2-primary)",
    descriptionColor: "var(--home2-accent)"
  });

  useEffect(() => {
    const savedSlides = localStorage.getItem('heroSlides');
    if (savedSlides) {
      setHeroSlides(JSON.parse(savedSlides));
    }
    
    const savedBackground = localStorage.getItem('heroBackground');
    if (savedBackground) {
      setHeroBackground(JSON.parse(savedBackground));
    }
    
    const savedTextColors = localStorage.getItem('heroTextColors');
    if (savedTextColors) {
      setHeroTextColors(JSON.parse(savedTextColors));
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
    if (editTitle.trim() && editDescription.trim() && editDescription.length >= 400 && editDescription.length <= 600) {
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
      toast.error("Title required and description must be 400-600 characters");
    }
  };

  const addNewSlide = () => {
    const newSlide: HeroSlide = {
      id: Math.max(...heroSlides.map(s => s.id)) + 1,
      title: "New Slide Title",
      description: "Add your SEO-optimized description here. Make sure it's between 400-600 characters to provide comprehensive information about your products and services. Include relevant keywords, compelling benefits, and clear calls to action. Describe your unique value proposition and what sets you apart from competitors. Focus on customer benefits and legal compliance. Mention shipping, pricing, quality guarantees, and customer support. Make every word count towards converting visitors into customers."
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

  const saveHeroBackground = () => {
    localStorage.setItem('heroBackground', JSON.stringify(heroBackground));
    toast.success("Hero background updated successfully");
  };

  const saveHeroTextColors = () => {
    localStorage.setItem('heroTextColors', JSON.stringify(heroTextColors));
    toast.success("Hero text colors updated successfully");
  };

  const applyColorPreset = (preset: string) => {
    const presets: { [key: string]: HeroTextColors } = {
      default: { titleColor: "var(--home2-primary)", descriptionColor: "var(--home2-accent)" },
      dark: { titleColor: "0, 0%, 20%", descriptionColor: "0, 0%, 40%" },
      light: { titleColor: "0, 0%, 100%", descriptionColor: "0, 0%, 95%" },
      vibrant: { titleColor: "350, 90%, 50%", descriptionColor: "350, 80%, 35%" },
      elegant: { titleColor: "240, 30%, 30%", descriptionColor: "240, 20%, 50%" }
    };
    setHeroTextColors(presets[preset]);
    toast.success(`Applied ${preset} preset`);
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
                Hero Text Colors
              </CardTitle>
              <CardDescription>
                Customize hero title and description colors with presets or custom HSL values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Color Presets</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button onClick={() => applyColorPreset('default')} size="sm" variant="outline">Default Red</Button>
                    <Button onClick={() => applyColorPreset('dark')} size="sm" variant="outline">Dark</Button>
                    <Button onClick={() => applyColorPreset('light')} size="sm" variant="outline">Light</Button>
                    <Button onClick={() => applyColorPreset('vibrant')} size="sm" variant="outline">Vibrant</Button>
                    <Button onClick={() => applyColorPreset('elegant')} size="sm" variant="outline">Elegant</Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Title Color</label>
                  <Input
                    value={heroTextColors.titleColor}
                    onChange={(e) => setHeroTextColors({...heroTextColors, titleColor: e.target.value})}
                    placeholder="var(--home2-primary) or 0, 75%, 50%"
                  />
                  <div 
                    className="mt-2 h-10 rounded border-2 border-border flex items-center justify-center font-bold"
                    style={{color: heroTextColors.titleColor.startsWith('var') ? `hsl(${heroTextColors.titleColor})` : `hsl(${heroTextColors.titleColor})`}}
                  >
                    Sample Title
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description Color</label>
                  <Input
                    value={heroTextColors.descriptionColor}
                    onChange={(e) => setHeroTextColors({...heroTextColors, descriptionColor: e.target.value})}
                    placeholder="var(--home2-accent) or 0, 60%, 40%"
                  />
                  <div 
                    className="mt-2 h-10 rounded border-2 border-border flex items-center justify-center"
                    style={{color: heroTextColors.descriptionColor.startsWith('var') ? `hsl(${heroTextColors.descriptionColor})` : `hsl(${heroTextColors.descriptionColor})`}}
                  >
                    Sample Description Text
                  </div>
                </div>
                
                <Button onClick={saveHeroTextColors} className="bg-tactical hover:bg-tactical/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Text Colors
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="h-5 w-5 text-tactical" />
                Hero Background
              </CardTitle>
              <CardDescription>
                Customize the hero section background gradient using HSL color values (e.g., "0, 75%, 96%")
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From Color (HSL)</label>
                  <Input
                    value={heroBackground.fromColor}
                    onChange={(e) => setHeroBackground({...heroBackground, fromColor: e.target.value})}
                    placeholder="0, 75%, 96%"
                  />
                  <div 
                    className="mt-2 h-10 rounded border-2 border-border"
                    style={{backgroundColor: `hsl(${heroBackground.fromColor})`}}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Via Color (HSL)</label>
                  <Input
                    value={heroBackground.viaColor}
                    onChange={(e) => setHeroBackground({...heroBackground, viaColor: e.target.value})}
                    placeholder="0, 0%, 100%"
                  />
                  <div 
                    className="mt-2 h-10 rounded border-2 border-border"
                    style={{backgroundColor: `hsl(${heroBackground.viaColor})`}}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">To Color (HSL)</label>
                  <Input
                    value={heroBackground.toColor}
                    onChange={(e) => setHeroBackground({...heroBackground, toColor: e.target.value})}
                    placeholder="0, 0%, 100%"
                  />
                  <div 
                    className="mt-2 h-10 rounded border-2 border-border"
                    style={{backgroundColor: `hsl(${heroBackground.toColor})`}}
                  />
                </div>
                <div className="p-4 rounded border-2 border-border" style={{
                  background: `linear-gradient(to bottom right, hsl(${heroBackground.fromColor}), hsl(${heroBackground.viaColor}), hsl(${heroBackground.toColor}))`
                }}>
                  <p className="text-sm font-medium text-center">Preview</p>
                </div>
                <Button onClick={saveHeroBackground} className="bg-tactical hover:bg-tactical/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Background
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="h-5 w-5 text-tactical" />
                Hero Slides Manager
              </CardTitle>
              <CardDescription>
                Edit hero section slides. Descriptions must be 400-600 characters for SEO optimization and sales intent.
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
                            Description ({editDescription.length}/600 characters, min 400 required)
                          </label>
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Enter SEO-optimized description (400-600 characters). Include keywords, benefits, and sales intent."
                            maxLength={600}
                            rows={6}
                            className={editDescription.length < 400 ? 'border-destructive' : ''}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {editDescription.length < 400 
                              ? `${400 - editDescription.length} more characters needed` 
                              : `${600 - editDescription.length} characters remaining`}
                          </p>
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
