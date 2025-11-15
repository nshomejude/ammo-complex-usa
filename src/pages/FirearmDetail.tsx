import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import WhyBuyFromUs from "@/components/WhyBuyFromUs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { FirearmCard } from "@/components/FirearmCard";
import { EngagementSimulator } from "@/components/EngagementSimulator";
import { firearms as rawFirearms } from "@/data/firearms";
import { firearmCategories } from "@/data/firearmCategories";
import { products as rawProducts } from "@/data/products";
import { addFirearmVariations, addProductVariations } from "@/utils/addDefaultVariations";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Shield, Phone, Mail, MapPin, AlertTriangle, CheckCircle, Target, Award, AlertCircle, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const FirearmDetail = () => {
  // Add variations to all firearms and products
  const firearms = rawFirearms.map(addFirearmVariations);
  const products = rawProducts.map(addProductVariations);
  const { addToCart } = useCart();
  
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

  const handleAddToCart = () => {
    addToCart({
      id: firearm.id,
      name: `${firearm.manufacturer} ${firearm.name}`,
      price: firearm.price,
      image: "/placeholder.svg",
      type: 'firearm'
    });
    toast.success(`Added ${firearm.name} to cart`);
  };

  // Extract sections for reuse in desktop/mobile layouts
  const fflTransferSection = (
    <Alert className="border-red-500 bg-red-500/10">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-500">FFL Transfer Required</AlertTitle>
      <AlertDescription className="text-red-500/90">
        This firearm must be transferred to a licensed FFL dealer. Background check and age verification (21+ for handguns, 18+ for long guns) required by federal law.
      </AlertDescription>
    </Alert>
  );

  const whyChooseSection = firearm.whyChoose && (
    <Alert className="border-destructive bg-destructive/10">
      <Award className="h-5 w-5 text-destructive" />
      <AlertTitle className="text-lg font-bold text-destructive">Why Choose This Firearm</AlertTitle>
      <AlertDescription className="text-sm mt-2 leading-relaxed">
        {firearm.whyChoose}
      </AlertDescription>
    </Alert>
  );

  const quickSpecsSection = (
    <Card>
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
  );

  // SEO: Update document title and meta tags
  useEffect(() => {
    if (firearm) {
      const title = `${firearm.name} - ${firearm.manufacturer} | ${firearm.caliber.join('/')} | Buy Online`;
      document.title = title;

      // Scroll to review if hash is present
      if (window.location.hash) {
        setTimeout(() => {
          const element = document.querySelector(window.location.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      }

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
        <Alert className="mb-8 border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">FFL Transfer Required</AlertTitle>
          <AlertDescription>
            This firearm must be transferred to a licensed FFL dealer. Background check and age verification (21+ for handguns, 18+ for long guns) required by federal law.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2 mb-12">
          {/* Left Column - Image and Desktop-only sections */}
          <div>
            <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center p-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <Shield className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-tactical mb-3" />
                <Badge variant="secondary" className="px-3 py-1 text-sm">{firearm.actionType}</Badge>
              </div>
            </div>

            {/* Desktop only - sections under image */}
            <div className="hidden lg:block space-y-4 mt-4">
              {fflTransferSection}
              {whyChooseSection}
              {quickSpecsSection}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-4">
              <Link 
                to={`/brands/${firearm.manufacturer.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-tactical hover:underline mb-2"
              >
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-semibold">{firearm.manufacturer}</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{firearm.name}</h1>
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

            {/* Mobile/Tablet only - FFL Transfer section */}
            <div className="lg:hidden mb-4 sm:mb-6">
              {fflTransferSection}
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-baseline gap-3 sm:gap-4 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">${firearm.price.toFixed(2)}</span>
                {firearm.inStock ? (
                  <Badge className="bg-tactical text-tactical-foreground text-sm">Available</Badge>
                ) : (
                  <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Price may vary by location and FFL dealer fees apply</p>
            </div>

            {firearm.quantityVariations && firearm.quantityVariations.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Select Quantity:</p>
                <div className="flex flex-wrap gap-2">
                  {firearm.quantityVariations.map((variant, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${
                        variant.quantity === 1
                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                          : variant.inStock
                          ? 'bg-background border-border hover:border-primary hover:bg-primary/5 hover:scale-105'
                          : 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!variant.inStock}
                    >
                      Qty: {variant.quantity}
                      <span className="block text-xs mt-0.5">
                        ${variant.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full mb-6"
              disabled={!firearm.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {/* Shipping Calculator */}
            <Card className="mb-6 border-tactical/30 bg-tactical/5">
              <CardContent className="p-4">
                <ShippingCalculator quantity={1} />
              </CardContent>
            </Card>

            <p className="text-muted-foreground mb-6">
              {firearm.shortDescription || firearm.description}
            </p>

            {/* Mobile/Tablet only - Why Choose and Quick Specs sections */}
            <div className="lg:hidden space-y-6 mb-6">
              {whyChooseSection}
              {quickSpecsSection}
            </div>

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
              <Alert className="mt-6 border-destructive bg-destructive/10">
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid gap-1">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm">Features & Benefits</TabsTrigger>
              <TabsTrigger value="technical" className="text-xs sm:text-sm">Technical Details</TabsTrigger>
              <TabsTrigger value="uses" className="text-xs sm:text-sm">Use Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 sm:mt-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                    Product Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none p-4 sm:p-6">
                  <div className="text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
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

            <TabsContent value="features" className="mt-4 sm:mt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {firearm.features && firearm.features.length > 0 && (
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {firearm.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {firearm.benefits && firearm.benefits.length > 0 && (
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {firearm.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{benefit}</span>
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
                  <CardContent className="py-6 sm:py-8 text-center text-muted-foreground text-xs sm:text-sm p-4 sm:p-6">
                    Detailed features and benefits information coming soon.
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="technical" className="mt-4 sm:mt-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Technical Specifications & Details</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none p-4 sm:p-6">
                  {firearm.technicalDetails ? (
                    <div className="text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                      {firearm.technicalDetails.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Action Type</p>
                        <p className="font-semibold text-xs sm:text-sm">{firearm.actionType}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Capacity</p>
                        <p className="font-semibold text-xs sm:text-sm">{firearm.capacity}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Barrel Length</p>
                        <p className="font-semibold text-xs sm:text-sm">{firearm.barrelLength}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Weight</p>
                        <p className="font-semibold text-xs sm:text-sm">{firearm.weight}</p>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Finish</p>
                        <p className="font-semibold text-xs sm:text-sm">{firearm.finish}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uses" className="mt-4 sm:mt-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                    Recommended Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {firearm.useCases && firearm.useCases.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      {firearm.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border bg-secondary/30">
                          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-tactical mt-0.5 flex-shrink-0" />
                          <p className="text-xs sm:text-sm">{useCase}</p>
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

        {/* Reviews Section */}
        <section className="mb-12">
          <ProductReviews productId={firearm.id} productType="firearm" />
        </section>

        {/* Why Buy From Us Section */}
        <WhyBuyFromUs />

        {compatibleAmmo.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Compatible Ammunition</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {compatibleAmmo.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product}
                  quantityVariations={[
                    { rounds: 20, price: product.price, inStock: true },
                    { rounds: 50, price: product.price * 2.3, inStock: true },
                    { rounds: 100, price: product.price * 4.2, inStock: product.inStock },
                  ]}
                />
              ))}
            </div>
          </div>
        )}

        {relatedFirearms.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Firearms</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFirearms.map((related) => (
                <FirearmCard 
                  key={related.id} 
                  {...related}
                  quantityVariations={[
                    { quantity: 1, price: related.price, inStock: true },
                    { quantity: 2, price: related.price * 1.9, inStock: true },
                    { quantity: 3, price: related.price * 2.7, inStock: related.inStock },
                  ]}
                />
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