import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Truck, 
  Award, 
  Clock, 
  Target, 
  Zap,
  CheckCircle,
  Star,
  TrendingUp,
  Package,
  Lock,
  Users
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { FirearmCard } from "@/components/FirearmCard";
import { products } from "@/data/products";
import { firearms } from "@/data/firearms";
import { categories } from "@/data/categories";
import { useEffect } from "react";

const Home2 = () => {
  const topProducts = products.filter(p => p.inStock).slice(0, 8);
  const topFirearms = firearms.filter(f => f.inStock).slice(0, 4);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "ARMS COMPLEX - Premium Firearms & Ammunition | Home";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your trusted source for premium firearms and ammunition. Fast shipping, competitive prices, and expert customer service. Shop top brands and find everything you need for shooting sports and personal defense.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'firearms, ammunition, guns, ammo, shooting supplies, tactical gear, gun shop, ammunition store, buy ammo online, firearm dealer');
    }
  }, []);

  const trustIndicators = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed FFL dealer with comprehensive insurance coverage"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Orders ship within 24 hours with secure packaging and tracking"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only authentic products from authorized manufacturers"
    },
    {
      icon: Lock,
      title: "Secure Checkout",
      description: "SSL encrypted transactions and secure payment processing"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Expert Selection",
      description: "Curated inventory of top-performing ammunition and firearms chosen by industry professionals"
    },
    {
      icon: Zap,
      title: "Competitive Pricing",
      description: "Best prices on premium brands with regular sales and bulk discounts available"
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "Knowledgeable team ready to help with product selection and technical questions"
    },
    {
      icon: Package,
      title: "In-Stock Guarantee",
      description: "Real-time inventory updates ensure what you see is ready to ship immediately"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products Available" },
    { number: "24hr", label: "Shipping Time" },
    { number: "100%", label: "Authentic Products" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tactical/10 via-background to-background border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-tactical/20 text-tactical border-tactical">
                Trusted Since 2020
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Premium Firearms & Ammunition
                <span className="block text-tactical mt-2">Delivered to Your Door</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Your trusted source for quality firearms, ammunition, and shooting supplies. 
                Competitive prices, expert service, and fast shipping on every order.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-tactical hover:bg-tactical/90">
                    Shop Ammunition
                  </Button>
                </Link>
                <Link to="/firearms">
                  <Button size="lg" variant="outline">
                    Browse Firearms
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {topFirearms.map((firearm, index) => (
                <Card key={firearm.id} className={`hover:shadow-lg transition-shadow ${index === 0 ? 'col-span-2' : ''}`}>
                  <CardContent className="p-4">
                    {firearm.imageUrl && (
                      <img 
                        src={firearm.imageUrl} 
                        alt={firearm.name} 
                        className="w-full h-32 object-contain mb-2"
                      />
                    )}
                    <p className="font-semibold text-sm line-clamp-1">{firearm.name}</p>
                    <p className="text-tactical font-bold">${firearm.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-tactical/10">
                  <indicator.icon className="h-6 w-6 text-tactical" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{indicator.title}</h3>
                  <p className="text-sm text-muted-foreground">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-tactical mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Popular Categories</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Shop by Ammunition Type
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From pistol to rifle ammunition, we stock everything you need for training, 
              competition, and personal defense.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:border-tactical cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant="secondary">{category.count} Products</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-tactical hover:text-tactical/80">
                      <span className="font-semibold">Shop Now</span>
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">In Stock Now</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Ammunition
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Top-rated ammunition from trusted manufacturers. Ready to ship today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product}
                grainWeight={product.grainWeight}
                grainWeightVariations={[
                  { grainWeight: '55gr', price: product.price - 2, inStock: true },
                  { grainWeight: '62gr', price: product.price, inStock: true },
                  { grainWeight: '77gr', price: product.price + 3, inStock: product.inStock },
                ]}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="bg-tactical hover:bg-tactical/90">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose ARMS COMPLEX
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the best products, prices, and service in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-tactical/10">
                      <benefit.icon className="h-6 w-6 text-tactical" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">{benefit.title}</CardTitle>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-tactical to-tactical/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Browse our extensive selection of firearms and ammunition. 
              All orders ship within 24 hours with tracking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Licensed FFL Dealer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home2;
