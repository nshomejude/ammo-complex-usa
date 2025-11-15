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
import { ShoppingCart, AlertCircle, ArrowLeft, Package, Shield, CheckCircle, Minus, Plus, Target, Award, Zap, Download, Calculator, BookOpen, Crosshair } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { useCart } from "@/hooks/useCart";
import { generateProductLoadDataPDF } from "@/utils/pdfGenerator";
import { firearms } from "@/data/firearms";
import { ProductReviews } from "@/components/reviews/ProductReviews";

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

  // Find compatible firearms based on caliber
  const compatibleFirearms = firearms.filter(firearm => 
    firearm.caliber.some(cal => 
      cal.toLowerCase().includes(product.caliber.toLowerCase().replace(/[^a-z0-9]/gi, ''))
    )
  ).slice(0, 6);

  const handleDownloadLoadData = () => {
    generateProductLoadDataPDF(product);
    toast.success('Load data sheet downloaded successfully');
  };

  // Extract sections for reuse in desktop/mobile layouts
  const whyChooseSection = product.whyChoose && (
    <Alert className="border-destructive bg-destructive/10">
      <Award className="h-5 w-5 text-destructive" />
      <AlertTitle className="text-base font-bold text-destructive">Why Choose This Ammunition</AlertTitle>
      <AlertDescription className="text-sm mt-2 leading-relaxed line-clamp-3">
        {product.whyChoose}
      </AlertDescription>
    </Alert>
  );

  const legalRequirementsSection = (
    <Alert className="border-destructive bg-destructive/10">
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertTitle className="text-destructive">Legal Purchase Requirements</AlertTitle>
      <AlertDescription className="text-sm">
        You must be 18+ for rifle/shotgun ammunition and 21+ for handgun ammunition. 
        Valid ID and compliance with all federal, state, and local laws required.
      </AlertDescription>
    </Alert>
  );

  const professionalToolsSection = (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Professional Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleDownloadLoadData}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Load Data Sheet
        </Button>
        <Link to={`/ballistic-calculator?caliber=${encodeURIComponent(product.caliber)}`}>
          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Ballistics for {product.caliber}
          </Button>
        </Link>
        <Link to="/reloading-guide">
          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            View Reloading Guide
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  // SEO: Update document title and meta tags
  useEffect(() => {
    document.title = `${product.name} - ${product.caliber} ${product.rounds} Rounds | Arms Complex`;

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
          {/* Left Column - Product Image and Desktop-only sections */}
          <div>
            <Card className="overflow-hidden">
              <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-tactical mb-2">{product.caliber}</div>
                  <div className="text-base text-muted-foreground">{product.rounds} Rounds</div>
                </div>
              </div>
            </Card>

            {/* Desktop only - sections under image */}
            <div className="hidden lg:block space-y-6 mt-6">
              {whyChooseSection}
              {legalRequirementsSection}
              {professionalToolsSection}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6" itemScope itemType="https://schema.org/Product">
            <div>
              <h1 className="text-4xl font-bold mb-2" itemProp="name">{product.name}</h1>
              {product.manufacturer && (
                <div className="mb-3">
                  <Link 
                    to={`/brands/${product.manufacturer.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-lg text-tactical hover:underline"
                  >
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">{product.manufacturer}</span>
                  </Link>
                </div>
              )}
              <p className="text-lg text-muted-foreground" itemProp="description">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Mobile/Tablet only - Why Choose section */}
            <div className="lg:hidden">
              {whyChooseSection}
            </div>

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

            {/* Mobile/Tablet only - Legal Requirements and Professional Tools */}
            <div className="lg:hidden space-y-6">
              {legalRequirementsSection}
              {professionalToolsSection}
            </div>
          </div>
        </article>

        {/* Reloading Information Section */}
        <section className="mb-12">
          <Card className="border-tactical/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-tactical" />
                Reloading Information for {product.caliber}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-tactical" />
                    Safety Considerations
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Always start 10% below maximum published loads</li>
                    <li>• Use only components specified in reloading manuals</li>
                    <li>• Inspect cases for cracks or defects before loading</li>
                    <li>• Keep detailed records of all load data and results</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-tactical" />
                    Recommended Components
                  </h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Brass: Once-fired or new {product.caliber} cases</li>
                    <li>• Primers: Match manufacturer specifications</li>
                    <li>• Powder: Consult current reloading manual</li>
                    <li>• Bullets: Various weights available for this caliber</li>
                  </ul>
                </div>
              </div>
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle className="text-destructive-foreground">Critical Safety Warning</AlertTitle>
                <AlertDescription className="text-destructive-foreground text-sm">
                  Never exceed published maximum loads. Always consult multiple current reloading manuals 
                  and start with reduced loads. Improper reloading can result in serious injury or death.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Link to="/reloading-guide" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Complete Reloading Guide
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1" onClick={handleDownloadLoadData}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Checklists
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

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
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                    Product Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none p-4 sm:p-6">
                  <div className="text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
                    {product.longDescription ? (
                      <div className="space-y-6">
                        {product.longDescription.split('\n\n').map((paragraph, idx) => {
                          // Check if it's a section header (starts with ##)
                          if (paragraph.startsWith('## ')) {
                            const headerText = paragraph.replace('## ', '');
                            return (
                              <div key={idx} className="mt-6 sm:mt-8 mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                  <div className="h-1 w-8 sm:w-12 bg-tactical rounded"></div>
                                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">{headerText}</h3>
                                </div>
                              </div>
                            );
                          }
                          
                          // Check if it's a bulleted list item
                          if (paragraph.startsWith('• ') || paragraph.startsWith('- ')) {
                            const items = paragraph.split('\n').filter(line => line.trim());
                            return (
                              <ul key={idx} className="space-y-2 ml-4 sm:ml-6">
                                {items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-sm sm:text-base leading-relaxed text-foreground list-disc">
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
                              <ol key={idx} className="space-y-2 ml-4 sm:ml-6 list-decimal">
                                {items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-sm sm:text-base leading-relaxed text-foreground">
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
                              className="text-sm sm:text-base leading-relaxed text-foreground"
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

            <TabsContent value="features" className="mt-4 sm:mt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {product.features && product.features.length > 0 && (
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-tactical mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <Card>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {product.benefits.map((benefit, idx) => (
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

              {(!product.features || product.features.length === 0) && 
               (!product.benefits || product.benefits.length === 0) && (
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
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-tactical" />
                    Technical Specifications & Ballistic Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none p-4 sm:p-6">
                  {product.technicalDetails ? (
                    <div className="text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                      {product.technicalDetails.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Caliber</p>
                        <p className="font-semibold text-xs sm:text-sm">{product.caliber}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Rounds per Box</p>
                        <p className="font-semibold text-xs sm:text-sm">{product.rounds}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Grain Weight</p>
                        <p className="font-semibold text-xs sm:text-sm">{product.grainWeight || 'Varies'}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Manufacturer</p>
                        <p className="font-semibold text-xs sm:text-sm">{product.manufacturer || 'Various'}</p>
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
      </main>

      {/* Product Specifications - Full Width */}
      <section className="mb-8 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card>
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

          {/* FAQ Section */}
          <Separator className="my-6" />
          <div className="mt-6">
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shipping Info - Full Width */}
      <section className="mb-8 bg-tactical/5 py-8">
        <div className="container mx-auto px-4">
          <Card className="border-tactical/30 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-tactical" />
                Shipping Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Weight:</p>
                  <p className="font-semibold">
                    {product.rounds >= 50 ? '2-3 lbs' : 
                     product.rounds >= 20 ? '1-2 lbs' : '0.5-1 lb'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">HazMat Required:</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Signature Required:</p>
                  <p className="font-semibold">Adult (21+)</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Standard Shipping:</p>
                  <p className="font-semibold">3-7 days</p>
                </div>
              </div>
              <Link to="/shipping">
                <Button variant="outline" size="sm" className="w-full sm:w-auto mt-4">
                  View Shipping Policy
              </Button>
            </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantee - Full Width */}
      <section className="mb-8 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-tactical" />
                Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Factory fresh ammunition</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Quality guaranteed by manufacturer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Secure HazMat packaging</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-tactical mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Full compliance verification</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        
        {/* Reviews Section */}
        <section className="mb-12">
          <ProductReviews productId={product.id} productType="product" />
        </section>

        {/* Why Buy From Us Section */}
        <WhyBuyFromUs />

        {/* Compatible Firearms */}
        {compatibleFirearms.length > 0 && (
          <section className="mb-12">
            <Card className="border-tactical/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crosshair className="h-6 w-6 text-tactical" />
                  Compatible Firearms for {product.caliber}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  These firearms are chambered for {product.caliber} and can safely use this ammunition
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {compatibleFirearms.map((firearm) => (
                    <Link key={firearm.id} to={`/firearms/${firearm.id}`}>
                      <Card className="h-full transition-all hover:shadow-lg hover:border-tactical/50 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm line-clamp-1">{firearm.name}</h4>
                              <p className="text-xs text-muted-foreground">{firearm.manufacturer}</p>
                            </div>
                            {firearm.inStock && (
                              <Badge variant="outline" className="border-tactical text-tactical text-xs ml-2">
                                Available
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-wrap gap-1">
                              {firearm.caliber.slice(0, 2).map((cal, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {cal}
                                </Badge>
                              ))}
                              {firearm.caliber.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{firearm.caliber.length - 2}
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm font-bold text-tactical">
                              ${firearm.price.toFixed(0)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link to="/firearms">
                    <Button variant="outline">
                      View All Firearms
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

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