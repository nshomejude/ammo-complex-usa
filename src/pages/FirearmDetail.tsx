import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { FirearmCard } from "@/components/FirearmCard";
import { EngagementSimulator } from "@/components/EngagementSimulator";
import { firearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { products } from "@/data/products";
import { Shield, Phone, Mail, MapPin, AlertTriangle, CheckCircle, Target, Award } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const FirearmDetail = () => {
  const { id } = useParams();
  const firearm = firearms.find(f => f.id === id);

  if (!firearm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Firearm Not Found</AlertTitle>
            <AlertDescription>
              The firearm you're looking for doesn't exist in our catalog.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const category = firearmCategories.find(cat => cat.slug === firearm.categorySlug);
  const relatedFirearms = firearms
    .filter(f => f.categorySlug === firearm.categorySlug && f.id !== firearm.id)
    .slice(0, 4);
  
  const compatibleAmmo = products.filter(product => 
    firearm.caliber.some(cal => product.caliber.includes(cal))
  ).slice(0, 4);

  // SEO: Update document title and meta tags
  useEffect(() => {
    if (firearm) {
      const title = `${firearm.name} - ${firearm.manufacturer} | ${firearm.caliber.join('/')} | Buy Online`;
      document.title = title;

      const updateMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("name", name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      const description = firearm.shortDescription || firearm.description;
      updateMeta("description", `${description} ${firearm.inStock ? "In stock now" : "Out of stock"}. Price: $${firearm.price}. Licensed FFL dealer. ${firearm.caliber.join(', ')} caliber.`);
      
      if (firearm.seoKeywords) {
        updateMeta("keywords", firearm.seoKeywords.join(", "));
      }

      // Structured Data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${firearm.manufacturer} ${firearm.name}`,
        "description": firearm.longDescription || firearm.description,
        "sku": firearm.id,
        "brand": {
          "@type": "Brand",
          "name": firearm.manufacturer
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "USD",
          "price": firearm.price,
          "availability": firearm.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      };

      let script = document.querySelector('script[type="application/ld+json"][data-page="firearm"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-page", "firearm");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);

      return () => {
        document.title = "Arms Complex - Licensed Firearm Dealer";
      };
    }
  }, [firearm]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16">
        <Alert className="mb-8 border-warning bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning-foreground">FFL Transfer Required</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            This firearm must be transferred to a licensed FFL dealer. Background check and age verification (21+ for handguns, 18+ for long guns) required by federal law.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center p-6">
            <div className="text-center">
              <Shield className="h-20 w-20 mx-auto text-tactical mb-3" />
              <Badge variant="secondary" className="px-3 py-1">{firearm.actionType}</Badge>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">{firearm.manufacturer}</p>
              <h1 className="text-4xl font-bold mb-4">{firearm.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {firearm.caliber.map((cal, idx) => (
                  <Badge key={idx} variant="outline" className="border-tactical text-tactical">
                    {cal}
                  </Badge>
                ))}
                {category && (
                  <Link to={`/firearm-category/${category.slug}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {category.name}
                    </Badge>
                  </Link>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-tactical">${firearm.price.toFixed(2)}</span>
                {firearm.inStock ? (
                  <Badge className="bg-tactical text-tactical-foreground">Available</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Price may vary by location and FFL dealer fees apply</p>
            </div>

            <p className="text-muted-foreground mb-6">
              {firearm.shortDescription || firearm.description}
            </p>

            {firearm.whyChoose && (
              <Alert className="mb-6 border-tactical/50 bg-tactical/5">
                <Award className="h-5 w-5 text-tactical" />
                <AlertTitle className="text-lg font-bold">Why Choose This Firearm</AlertTitle>
                <AlertDescription className="text-sm mt-2 leading-relaxed">
                  {firearm.whyChoose}
                </AlertDescription>
              </Alert>
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Specifications</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Action Type</p>
                  <p className="font-semibold">{firearm.actionType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{firearm.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barrel Length</p>
                  <p className="font-semibold">{firearm.barrelLength}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold">{firearm.weight}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Finish</p>
                  <p className="font-semibold">{firearm.finish}</p>
                </div>
              </CardContent>
            </Card>

            {firearm.ballisticData && (
              <>
                <Card className="mb-6 border-tactical/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-tactical" />
                      Ballistic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Effective Range</p>
                      <p className="font-semibold text-tactical">{firearm.ballisticData.effectiveRange}</p>
                    </div>
                    {firearm.ballisticData.maxRange && (
                      <div>
                        <p className="text-sm text-muted-foreground">Maximum Range</p>
                        <p className="font-semibold">{firearm.ballisticData.maxRange}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Muzzle Velocity</p>
                      <p className="font-semibold">{firearm.ballisticData.muzzleVelocity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Muzzle Energy</p>
                      <p className="font-semibold">{firearm.ballisticData.muzzleEnergy}</p>
                    </div>
                    {firearm.ballisticData.accuracy && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="font-semibold text-tactical">{firearm.ballisticData.accuracy}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <EngagementSimulator
                  effectiveRange={firearm.ballisticData.effectiveRange}
                  maxRange={firearm.ballisticData.maxRange}
                  muzzleEnergy={firearm.ballisticData.muzzleEnergy}
                  accuracy={firearm.ballisticData.accuracy}
                />
              </>
            )}

            <div className="space-y-3">
              <Button 
                className="w-full bg-tactical hover:bg-tactical/90"
                size="lg"
                disabled={!firearm.inStock}
              >
                <Phone className="mr-2 h-5 w-5" />
                {firearm.inStock ? 'Contact to Purchase' : 'Out of Stock'}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Request More Info
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <MapPin className="mr-2 h-5 w-5" />
                Find FFL Dealer
              </Button>
            </div>

            {category && (
              <Alert className="mt-6">
                <AlertDescription>
                  <strong>Age Requirement:</strong> {category.ageRequirement}+ years old
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <section className="mb-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features & Benefits</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="uses">Use Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-tactical" />
                    Product Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <div className="text-base leading-relaxed space-y-4">
                    {firearm.longDescription ? (
                      firearm.longDescription.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{firearm.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {firearm.features && firearm.features.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-tactical" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {firearm.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {firearm.benefits && firearm.benefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-tactical" />
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {firearm.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Award className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {(!firearm.features || firearm.features.length === 0) && 
               (!firearm.benefits || firearm.benefits.length === 0) && (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Detailed features and benefits information coming soon.
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="technical" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications & Details</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  {firearm.technicalDetails ? (
                    <div className="text-sm leading-relaxed space-y-4">
                      {firearm.technicalDetails.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Action Type</p>
                        <p className="font-semibold">{firearm.actionType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="font-semibold">{firearm.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Barrel Length</p>
                        <p className="font-semibold">{firearm.barrelLength}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="font-semibold">{firearm.weight}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Finish</p>
                        <p className="font-semibold">{firearm.finish}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-tactical" />
                    Recommended Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {firearm.useCases && firearm.useCases.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {firearm.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border bg-secondary/30">
                          <Target className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{useCase}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This firearm is suitable for various applications including training, competition, and duty use.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I purchase this firearm?</AccordionTrigger>
              <AccordionContent>
                All firearms must be transferred through a licensed FFL dealer. After placing your order, you'll need to select an FFL dealer near you. We'll ship the firearm to them, where you'll complete the required background check (Form 4473) and take possession. The entire process typically takes 7-14 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the age requirements?</AccordionTrigger>
              <AccordionContent>
                Federal law requires buyers to be at least 21 years old for handguns and 18 years old for rifles and shotguns. Some states have additional requirements. You must also pass a federal background check and comply with all applicable state and local laws.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does this come with magazines?</AccordionTrigger>
              <AccordionContent>
                Most firearms include at least one factory magazine. Check the product specifications or contact us for specific details about what's included with this model. Additional magazines can be purchased separately.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is the warranty on this firearm?</AccordionTrigger>
              <AccordionContent>
                This firearm is covered by the manufacturer's warranty. {firearm.manufacturer} offers warranty coverage for defects in materials and workmanship. Specific warranty terms vary by manufacturer - contact us or the manufacturer directly for complete warranty information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I return or exchange this firearm?</AccordionTrigger>
              <AccordionContent>
                Due to federal regulations, firearms that have been transferred through an FFL dealer generally cannot be returned unless there is a defect covered under warranty. Please contact us before taking possession if you have concerns about your order. We're here to ensure you're completely satisfied with your purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {compatibleAmmo.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Compatible Ammunition</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {compatibleAmmo.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {relatedFirearms.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Firearms</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFirearms.map((related) => (
                <FirearmCard key={related.id} {...related} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FirearmDetail;