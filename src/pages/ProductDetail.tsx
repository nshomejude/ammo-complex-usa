import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import WhyBuyFromUs from "@/components/WhyBuyFromUs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products as rawProducts } from "@/data/products";
import { addProductVariations } from "@/utils/addDefaultVariations";
import { ShoppingCart, AlertCircle, ArrowLeft, Package, Shield, CheckCircle, Minus, Plus, Target, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { useCart } from "@/hooks/useCart";

const ProductDetail = () => {
  // Add variations to all products
  const products = rawProducts.map(addProductVariations);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Alert className="border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive-foreground">Product Not Found</AlertTitle>
            <AlertDescription className="text-destructive-foreground">
              The product you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: "/placeholder.svg",
        type: 'product'
      });
    }
    toast.success(`Added ${quantity}x ${product.name} to cart`);
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 50));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const totalPrice = (product.price * quantity).toFixed(2);

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // SEO: Update document title and meta tags
  useEffect(() => {
    document.title = `${product.name} - ${product.caliber} ${product.rounds} Rounds | Arms Complex`;

    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", `Buy ${product.name} - ${product.description} ${product.rounds} rounds of ${product.caliber}. ${product.inStock ? "In stock" : "Out of stock"}. Price: $${product.price}. Licensed FFL dealer.`);
    updateMeta("keywords", `${product.name}, ${product.caliber}, ${product.caliber} ammunition, buy ${product.caliber}, ${product.rounds} rounds, ammunition for sale`);

    // Open Graph
    const updateOG = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOG("og:title", `${product.name} | Arms Complex`);
    updateOG("og:description", product.description);
    updateOG("og:type", "product");
    updateOG("og:url", window.location.href);
    updateOG("og:price:amount", product.price.toString());
    updateOG("og:price:currency", "USD");
    updateOG("og:availability", product.inStock ? "in stock" : "out of stock");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Product structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": product.manufacturer || "Various"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "USD",
        "price": product.price,
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Arms Complex"
        }
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Caliber",
          "value": product.caliber
        },
        {
          "@type": "PropertyValue",
          "name": "Rounds",
          "value": product.rounds
        },
        {
          "@type": "PropertyValue",
          "name": "Category",
          "value": product.category
        }
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"][data-page="product"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-page", "product");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.title = "Arms Complex - Licensed Ammunition Dealer";
    };
  }, [product]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </nav>

        <article className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Product Image/Placeholder */}
          <Card className="overflow-hidden">
            <div className="aspect-square bg-secondary flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-tactical mb-2">{product.caliber}</div>
                <div className="text-base text-muted-foreground">{product.rounds} Rounds</div>
              </div>
            </div>
          </Card>

          {/* Product Info */}
          <div className="space-y-6" itemScope itemType="https://schema.org/Product">
            <div>
              <h1 className="text-4xl font-bold mb-2" itemProp="name">{product.name}</h1>
              <p className="text-lg text-muted-foreground" itemProp="description">
                {product.shortDescription || product.description}
              </p>
            </div>

            {product.whyChoose && (
              <Alert className="border-tactical/50 bg-tactical/5">
                <Award className="h-5 w-5 text-tactical" />
                <AlertTitle className="text-base font-bold">Why Choose This Ammunition</AlertTitle>
                <AlertDescription className="text-sm mt-2 leading-relaxed line-clamp-3">
                  {product.whyChoose}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-3">
              {product.inStock ? (
                <Badge className="bg-tactical text-tactical-foreground border-0 text-base px-4 py-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="border-destructive text-destructive text-base px-4 py-1">
                  Out of Stock
                </Badge>
              )}
              <Badge variant="outline" className="text-base px-4 py-1">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
            </div>

            <Separator />

            <div>
              <div className="text-4xl font-bold text-tactical mb-2">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">Per box of {product.rounds} rounds</p>
              <p className="text-xs text-muted-foreground mt-1">
                ${(product.price / product.rounds).toFixed(3)} per round
              </p>
            </div>

            {/* Quantity Variations */}
            {product.quantityVariations && product.quantityVariations.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-3 block">Select Package:</label>
                <div className="flex flex-wrap gap-2">
                  {product.quantityVariations.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuantity(Math.ceil(variant.rounds / product.rounds))}
                      className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${
                        variant.rounds === product.rounds
                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                          : variant.inStock
                          ? 'bg-background border-border hover:border-primary hover:bg-primary/5 hover:scale-105'
                          : 'bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!variant.inStock}
                    >
                      {variant.rounds} Rounds
                      <span className="block text-xs mt-1 font-normal">
                        ${variant.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= 50}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: <span className="text-xl font-bold text-foreground">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full bg-tactical hover:bg-tactical/90 text-lg py-6"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Shipping Calculator */}
            <Card className="border-tactical/30 bg-tactical/5">
              <CardContent className="p-4">
                <ShippingCalculator quantity={quantity} />
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Alert className="border-warning bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning-foreground">Legal Purchase Requirements</AlertTitle>
              <AlertDescription className="text-warning-foreground text-sm">
                You must be 18+ for rifle/shotgun ammunition and 21+ for handgun ammunition. 
                Valid ID and compliance with all federal, state, and local laws required.
              </AlertDescription>
            </Alert>
          </div>
        </article>

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
                    <Package className="h-5 w-5 text-tactical" />
                    Product Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <div className="text-base leading-relaxed space-y-4">
                    {product.longDescription ? (
                      <div className="space-y-6">
                        {product.longDescription.split('\n\n').map((paragraph, idx) => {
                          // Check if it's a section header (starts with ##)
                          if (paragraph.startsWith('## ')) {
                            const headerText = paragraph.replace('## ', '');
                            return (
                              <div key={idx} className="mt-8 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="h-1 w-12 bg-tactical rounded"></div>
                                  <h3 className="text-2xl font-bold text-foreground">{headerText}</h3>
                                </div>
                              </div>
                            );
                          }
                          
                          // Check if it's a bulleted list item
                          if (paragraph.startsWith('• ') || paragraph.startsWith('- ')) {
                            const items = paragraph.split('\n').filter(line => line.trim());
                            return (
                              <ul key={idx} className="space-y-2 ml-6">
                                {items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-base leading-relaxed text-foreground list-disc">
                                    {item.replace(/^[•-]\s*/, '')}
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          
                          // Check if it's a numbered list
                          if (/^\d+\.\s/.test(paragraph)) {
                            const items = paragraph.split('\n').filter(line => line.trim());
                            return (
                              <ol key={idx} className="space-y-2 ml-6 list-decimal">
                                {items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-base leading-relaxed text-foreground">
                                    {item.replace(/^\d+\.\s*/, '')}
                                  </li>
                                ))}
                              </ol>
                            );
                          }
                          
                          // Regular paragraph with bold text support
                          const formattedParagraph = paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
                          
                          return (
                            <p 
                              key={idx} 
                              className="text-base leading-relaxed text-foreground"
                              dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {product.features && product.features.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-tactical" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-tactical" />
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
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

              {(!product.features || product.features.length === 0) && 
               (!product.benefits || product.benefits.length === 0) && (
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
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-tactical" />
                    Technical Specifications & Ballistic Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  {product.technicalDetails ? (
                    <div className="text-sm leading-relaxed space-y-4">
                      {product.technicalDetails.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Caliber</p>
                        <p className="font-semibold">{product.caliber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rounds per Box</p>
                        <p className="font-semibold">{product.rounds}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grain Weight</p>
                        <p className="font-semibold">{product.grainWeight || 'Varies'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Manufacturer</p>
                        <p className="font-semibold">{product.manufacturer || 'Various'}</p>
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
                  {product.useCases && product.useCases.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border bg-secondary/30">
                          <Target className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{useCase}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        This ammunition is suitable for various applications including:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Target practice and range training</li>
                        <li>Competition shooting</li>
                        {product.category === 'rifle' && <li>Hunting and sporting use</li>}
                        {product.name.includes('Defense') && <li>Personal defense and home protection</li>}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Product Specifications */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Caliber</p>
                  <p className="font-semibold text-lg">{product.caliber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rounds per Box</p>
                  <p className="font-semibold text-lg">{product.rounds}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bullet Weight</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'pistol' ? '115-147 gr' : 
                     product.category === 'rifle' ? '55-168 gr' : 
                     product.category === 'shotgun' ? '1 oz' : '40 gr'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Muzzle Velocity</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'pistol' ? '1,100-1,200 fps' : 
                     product.category === 'rifle' ? '2,700-3,000 fps' : 
                     product.category === 'shotgun' ? '1,200-1,325 fps' : '1,200 fps'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bullet Type</p>
                  <p className="font-semibold text-lg">
                    {product.name.includes('FMJ') ? 'Full Metal Jacket (FMJ)' : 
                     product.name.includes('Defense') ? 'Jacketed Hollow Point (JHP)' : 
                     product.name.includes('Buckshot') ? '00 Buckshot' : 
                     product.name.includes('Slug') ? 'Rifled Slug' : 
                     'Soft Point (SP)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Case Material</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'shotgun' ? 'Plastic Hull' : 'Brass'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primer Type</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'rimfire' ? 'Rimfire' : 
                     product.category === 'shotgun' ? '209 Primer' : 'Boxer Primer'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reloadable</p>
                  <p className="font-semibold text-lg">
                    {product.category === 'rimfire' ? 'No' : 'Yes'}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold mb-3">Recommended Use</h3>
                <div className="flex flex-wrap gap-2">
                  {product.name.includes('Defense') && (
                    <>
                      <Badge variant="secondary">Self Defense</Badge>
                      <Badge variant="secondary">Home Protection</Badge>
                    </>
                  )}
                  {product.name.includes('FMJ') && (
                    <>
                      <Badge variant="secondary">Target Practice</Badge>
                      <Badge variant="secondary">Training</Badge>
                    </>
                  )}
                  {product.name.includes('Match') && (
                    <>
                      <Badge variant="secondary">Competition</Badge>
                      <Badge variant="secondary">Long Range</Badge>
                    </>
                  )}
                  {product.category === 'rifle' && !product.name.includes('FMJ') && (
                    <>
                      <Badge variant="secondary">Hunting</Badge>
                      <Badge variant="secondary">Target Shooting</Badge>
                    </>
                  )}
                  {product.category === 'shotgun' && (
                    <>
                      {product.name.includes('Buckshot') && <Badge variant="secondary">Home Defense</Badge>}
                      {product.name.includes('Target') && <Badge variant="secondary">Clay Sports</Badge>}
                      {product.name.includes('Slug') && <Badge variant="secondary">Hunting</Badge>}
                    </>
                  )}
                  {product.category === 'rimfire' && (
                    <>
                      <Badge variant="secondary">Plinking</Badge>
                      <Badge variant="secondary">Small Game</Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="col-span-full mt-6">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are the age requirements?</AccordionTrigger>
                <AccordionContent>
                  Federal law requires 18+ for rifle/shotgun ammo and 21+ for handgun ammo. Valid ID required.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is this ammunition reloadable?</AccordionTrigger>
                <AccordionContent>
                  {product.category === 'rimfire' ? 'No, rimfire ammunition is not reloadable.' : 'Yes, features brass cases with boxer primers suitable for reloading.'}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How should I store ammunition?</AccordionTrigger>
                <AccordionContent>
                  Store in a cool, dry place away from heat and moisture. Keep in original packaging or airtight container.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-6">
            <Card className="border-tactical/30 bg-tactical/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-tactical" />
                  Shipping Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-semibold">
                    {product.rounds >= 50 ? '2-3 lbs' : 
                     product.rounds >= 20 ? '1-2 lbs' : '0.5-1 lb'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HazMat Required:</span>
                  <span className="font-semibold">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Signature Required:</span>
                  <span className="font-semibold">Adult (21+)</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard Shipping:</span>
                  <span className="font-semibold">3-7 days</span>
                </div>
                <Link to="/shipping">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Shipping Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-tactical" />
                  Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Factory fresh ammunition</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Quality guaranteed by manufacturer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Secure HazMat packaging</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span>Full compliance verification</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Buy From Us Section */}
        <WhyBuyFromUs />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-tactical/50 cursor-pointer">
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="text-4xl font-bold text-tactical mb-2">{relatedProduct.caliber}</div>
                        <div className="text-sm text-muted-foreground">{relatedProduct.rounds} Rounds</div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-tactical">${relatedProduct.price.toFixed(2)}</span>
                        {relatedProduct.inStock ? (
                          <Badge variant="outline" className="border-tactical text-tactical">In Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="border-destructive text-destructive">Out of Stock</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;