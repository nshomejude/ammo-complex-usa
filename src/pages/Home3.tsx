import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Zap, 
  TrendingUp,
  Star,
  CheckCircle2,
  ArrowRight,
  Target,
  Award,
  Sparkles,
  ShieldCheck,
  Rocket,
  Gauge,
  Lock,
  Eye,
  Users2,
  Clock3,
  Package2
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useEffect } from "react";

const Home3 = () => {
  const featuredProducts = products.filter(p => p.inStock).slice(0, 6);
  
  useEffect(() => {
    // SEO Meta Tags
    document.title = "ARMS COMPLEX - Elite Firearms & Ammunition Retailer";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Elite firearms and ammunition dealer offering premium products, expert guidance, and unmatched service. Experience the future of tactical retail with cutting-edge inventory and lightning-fast delivery.');
    }
  }, []);

  const powerFeatures = [
    {
      icon: Rocket,
      title: "Instant Availability",
      description: "Real-time inventory tracking with instant order processing"
    },
    {
      icon: ShieldCheck,
      title: "Verified Authentic",
      description: "Every product verified authentic from authorized distributors"
    },
    {
      icon: Gauge,
      title: "Elite Performance",
      description: "Premium grade ammunition selected for maximum reliability"
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "Military-grade encryption protecting every transaction"
    }
  ];

  const advantages = [
    {
      icon: Target,
      stat: "99.8%",
      title: "Accuracy Rating",
      description: "Industry-leading order accuracy"
    },
    {
      icon: Zap,
      stat: "24hrs",
      title: "Ship Time",
      description: "Lightning-fast fulfillment"
    },
    {
      icon: Award,
      stat: "50K+",
      title: "Happy Customers",
      description: "Trusted nationwide"
    },
    {
      icon: Star,
      stat: "4.9/5",
      title: "Customer Rating",
      description: "Excellent reviews"
    }
  ];

  const processSteps = [
    {
      icon: Eye,
      number: "01",
      title: "Browse Elite Selection",
      description: "Explore our curated collection of premium firearms and ammunition from top manufacturers"
    },
    {
      icon: ShieldCheck,
      number: "02",
      title: "Secure Verification",
      description: "Quick and secure FFL verification process ensures full legal compliance"
    },
    {
      icon: Rocket,
      number: "03",
      title: "Fast Delivery",
      description: "Orders ship within 24 hours with secure packaging and real-time tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, hsl(var(--home3-primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Navigation />
      
      {/* Hero Section - Completely Different Design */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-home3-primary/10 via-home3-accent/5 to-home3-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-home3-accent/5 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-home3-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-home3-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border-2 border-home3-primary/30 bg-home3-accent-light/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-home3-primary" />
              <span className="text-sm font-semibold text-home3-dark">Premium Licensed FFL Dealer</span>
              <Shield className="h-4 w-4 text-home3-primary" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-home3-primary via-home3-accent to-home3-secondary bg-clip-text text-transparent animate-fade-in">
                Elite Tactical
              </span>
              <br />
              <span className="text-foreground">Excellence</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of firearms and ammunition retail. Premium products, lightning-fast delivery, and expert guidance for serious shooters who demand excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 bg-home3-primary hover:bg-home3-primary-hover text-white font-bold shadow-2xl shadow-home3-primary/30 hover:shadow-home3-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/firearms">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-10 py-7 border-2 border-home3-primary text-home3-primary hover:bg-home3-accent-light font-bold transition-all duration-300"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Explore Firearms
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-home3-primary" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-home3-primary" />
                <span>24hr Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-home3-primary" />
                <span>50K+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-home3-primary" />
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Power Features Bar */}
      <section className="py-8 bg-home3-dark border-y border-home3-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {powerFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white group">
                <div className="p-3 rounded-xl bg-home3-primary/20 group-hover:bg-home3-primary/30 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-5 w-5 text-home3-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{feature.title}</h3>
                  <p className="text-xs opacity-70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-home3-accent-light/30 to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-base bg-home3-accent-light text-home3-primary border-home3-primary">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-home3-primary to-home3-secondary bg-clip-text text-transparent">
              Unmatched Performance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading metrics that set us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card 
                key={index} 
                className="border-2 border-transparent hover:border-home3-primary transition-all duration-300 hover:shadow-2xl hover:shadow-home3-primary/20 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50"
              >
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br from-home3-primary to-home3-secondary w-fit">
                    <advantage.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-5xl font-black text-home3-primary mb-2">
                    {advantage.stat}
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase - Unique Layout */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-base bg-home3-accent-light text-home3-primary border-home3-primary">
              Product Categories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Precision Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our curated selection of premium ammunition and firearms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.slice(0, 6).map((category, index) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <Card className="group border-2 border-border hover:border-home3-primary transition-all duration-300 hover:shadow-xl hover:shadow-home3-primary/10 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-home3-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-home3-accent-light group-hover:bg-home3-primary group-hover:scale-110 transition-all duration-300">
                        <category.icon className="h-6 w-6 text-home3-primary group-hover:text-white" />
                      </div>
                      <Badge variant="secondary" className="font-bold">
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-home3-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-home3-primary font-bold group-hover:gap-4 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/categories">
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 bg-home3-primary hover:bg-home3-primary-hover text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-home3-primary/5 via-transparent to-home3-secondary/5" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-base bg-home3-accent-light text-home3-primary border-home3-primary">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-home3-primary to-home3-secondary bg-clip-text text-transparent">
              Get Started in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-home3-primary to-home3-secondary opacity-20" />
                )}
                
                <Card className="relative border-2 border-border hover:border-home3-primary transition-all duration-300 hover:shadow-2xl hover:shadow-home3-primary/20 group">
                  <CardHeader>
                    {/* Step Number */}
                    <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-home3-primary to-home3-secondary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-black text-white">{step.number}</span>
                    </div>
                    
                    <div className="pt-8 mb-4">
                      <div className="p-4 rounded-2xl bg-home3-accent-light w-fit mb-4 group-hover:bg-home3-primary group-hover:scale-110 transition-all duration-300">
                        <step.icon className="h-8 w-8 text-home3-primary group-hover:text-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl mb-3 group-hover:text-home3-primary transition-colors">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Modern Grid */}
      <section className="py-24 bg-home3-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-base bg-home3-primary/20 text-home3-accent border-home3-accent">
              In Stock Now
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Premium ammunition ready to ship today
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group bg-white/5 border-2 border-white/10 hover:border-home3-accent hover:bg-white/10 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-home3-accent/20">
                  <div className="aspect-square relative overflow-hidden bg-white/5 flex items-center justify-center">
                    <div className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {product.caliber}
                    </div>
                    {product.inStock && (
                      <Badge className="absolute top-4 right-4 bg-home3-accent text-white border-0">
                        In Stock
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="border-home3-accent/30 text-home3-accent">
                        {product.caliber}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-home3-accent text-home3-accent" />
                        <span className="text-sm font-bold text-home3-accent">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-home3-accent transition-colors">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-home3-accent">
                        ${product.price}
                      </span>
                      <span className="text-sm text-white/50">per box</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-home3-accent hover:bg-home3-primary text-white font-bold"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-7 border-2 border-home3-accent text-home3-accent hover:bg-home3-accent hover:text-white font-bold transition-all duration-300"
              >
                <Package2 className="mr-2 h-5 w-5" />
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-home3-primary/10 via-home3-accent/5 to-home3-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-home3-primary/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-home3-primary via-home3-accent to-home3-secondary bg-clip-text text-transparent">
                Ready to Upgrade
              </span>
              <br />
              <span className="text-foreground">Your Arsenal?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust ARMS COMPLEX for their tactical needs. Experience premium service and elite products today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 bg-home3-primary hover:bg-home3-primary-hover text-white font-bold shadow-2xl shadow-home3-primary/30 hover:shadow-home3-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-10 py-7 border-2 border-home3-primary text-home3-primary hover:bg-home3-accent-light font-bold transition-all duration-300"
                >
                  <Users2 className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home3;
