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
  Users,
  Crosshair,
  Flame,
  Medal,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CircleDot,
  Sparkles,
  Quote
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

    // Apply custom color scheme for Home 2 - Enhanced Red Theme
    document.documentElement.style.setProperty('--home2-primary', '0 72% 51%');
    document.documentElement.style.setProperty('--home2-primary-hover', '0 72% 45%');
    document.documentElement.style.setProperty('--home2-accent', '14 88% 55%');
    document.documentElement.style.setProperty('--home2-accent-light', '0 75% 95%');
    document.documentElement.style.setProperty('--home2-dark', '0 50% 20%');
    document.documentElement.style.setProperty('--home2-gradient-start', '0 72% 51%');
    document.documentElement.style.setProperty('--home2-gradient-end', '14 88% 55%');
    
    return () => {
      // Clean up on unmount
      document.documentElement.style.removeProperty('--home2-primary');
      document.documentElement.style.removeProperty('--home2-primary-hover');
      document.documentElement.style.removeProperty('--home2-accent');
      document.documentElement.style.removeProperty('--home2-accent-light');
      document.documentElement.style.removeProperty('--home2-dark');
      document.documentElement.style.removeProperty('--home2-gradient-start');
      document.documentElement.style.removeProperty('--home2-gradient-end');
    };
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

  const features = [
    {
      icon: Target,
      title: "Precision Engineering",
      description: "Military-grade specifications for reliability and accuracy"
    },
    {
      icon: Crosshair,
      title: "Combat Proven",
      description: "Tested in the most demanding conditions by professionals"
    },
    {
      icon: Flame,
      title: "Maximum Performance",
      description: "Optimized ballistics for superior stopping power"
    },
    {
      icon: Medal,
      title: "Competition Ready",
      description: "Meet USPSA, IDPA, and military specifications"
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

  const testimonials = [
    {
      name: "James Mitchell",
      location: "Texas",
      role: "Competition Shooter",
      rating: 5,
      text: "Outstanding selection and lightning-fast shipping. I've been ordering my competition ammo from ARMS COMPLEX for over two years. The Federal HST and Hornady Critical Duty loads are always in stock and competitively priced. Customer service knows their products inside and out.",
      date: "2 weeks ago",
      verified: true
    },
    {
      name: "Sarah Anderson",
      location: "Arizona",
      role: "Law Enforcement",
      rating: 5,
      text: "As a law enforcement officer, I need reliable ammunition I can trust. ARMS COMPLEX consistently delivers authentic products with proper documentation. Their knowledge of ballistics and terminal performance is impressive. Highly recommend for duty carry.",
      date: "1 month ago",
      verified: true
    },
    {
      name: "Michael Rodriguez",
      location: "Florida",
      role: "Firearms Instructor",
      rating: 5,
      text: "I order bulk ammunition for my training courses regularly. ARMS COMPLEX offers the best combination of quality, price, and service. They understand the needs of instructors and always have bulk inventory available. The Winchester White Box and Federal American Eagle are perfect for student training.",
      date: "3 weeks ago",
      verified: true
    },
    {
      name: "David Chen",
      location: "California",
      role: "Defensive Carry",
      rating: 5,
      text: "Switching to ARMS COMPLEX was the best decision for my defensive carry needs. They helped me select the right Speer Gold Dot load for my compact 9mm. Fast shipping to California with all proper compliance. Professional operation from start to finish.",
      date: "2 months ago",
      verified: true
    },
    {
      name: "Robert Williams",
      location: "Virginia",
      role: "Veteran & Collector",
      rating: 5,
      text: "Impressed with the inventory depth and authentic products. I've purchased both firearms and ammunition multiple times. The staff understands military specifications and can discuss ballistic performance in detail. This is a serious operation run by people who know the industry.",
      date: "1 week ago",
      verified: true
    },
    {
      name: "Lisa Thompson",
      location: "Georgia",
      role: "New Gun Owner",
      rating: 5,
      text: "As a new gun owner, I was nervous about making the right choices. The team at ARMS COMPLEX patiently answered all my questions and helped me select appropriate ammunition for home defense and range practice. Educational resources on their site are excellent too.",
      date: "3 weeks ago",
      verified: true
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
      <style>{`
        .home2-theme {
          --primary: var(--home2-primary);
          --primary-foreground: 0 0% 100%;
        }
        .home2-primary {
          background-color: hsl(var(--home2-primary));
          color: hsl(0 0% 100%);
          transition: all 0.3s ease;
        }
        .home2-primary:hover {
          background-color: hsl(var(--home2-primary-hover));
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px hsl(var(--home2-primary) / 0.3);
        }
        .home2-accent {
          color: hsl(var(--home2-accent));
        }
        .home2-accent-bg {
          background-color: hsl(var(--home2-accent-light));
        }
        .home2-border {
          border-color: hsl(var(--home2-primary));
        }
        .home2-gradient {
          background: linear-gradient(135deg, hsl(var(--home2-gradient-start)), hsl(var(--home2-gradient-end)));
        }
        .home2-card-hover {
          transition: all 0.3s ease;
        }
        .home2-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px hsl(var(--home2-primary) / 0.2);
        }
        .home2-glow {
          box-shadow: 0 0 30px hsl(var(--home2-primary) / 0.3);
        }
        .home2-pattern {
          background-image: 
            linear-gradient(30deg, hsl(var(--home2-primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--home2-primary) / 0.05) 87.5%, hsl(var(--home2-primary) / 0.05)),
            linear-gradient(150deg, hsl(var(--home2-primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--home2-primary) / 0.05) 87.5%, hsl(var(--home2-primary) / 0.05)),
            linear-gradient(30deg, hsl(var(--home2-primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--home2-primary) / 0.05) 87.5%, hsl(var(--home2-primary) / 0.05)),
            linear-gradient(150deg, hsl(var(--home2-primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--home2-primary) / 0.05) 87.5%, hsl(var(--home2-primary) / 0.05));
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px;
        }
      `}</style>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(0,75%,96%)] via-background to-background border-b">
        <div className="absolute inset-0 home2-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 home2-accent-bg home2-accent border-[hsl(var(--home2-accent))] rounded-full px-4 py-2">
                <Shield className="h-4 w-4" />
                <span className="font-semibold">Licensed FFL Dealer Since 2020</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">Premium Firearms</span>
                <span className="block">&</span>
                <span className="block home2-accent">Combat-Ready Ammunition</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                Trusted by military, law enforcement, and civilian shooters nationwide. 
                Fast shipping, competitive prices, and expert support.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 home2-accent" />
                  <span className="font-medium">Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 home2-accent" />
                  <span className="font-medium">24hr Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 home2-accent" />
                  <span className="font-medium">Expert Support</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/products">
                  <Button size="lg" className="home2-primary text-lg px-8 py-6">
                    <CircleDot className="mr-2 h-5 w-5" />
                    Shop Ammunition
                  </Button>
                </Link>
                <Link to="/firearms">
                  <Button size="lg" variant="outline" className="border-2 border-[hsl(var(--home2-primary))] home2-accent hover:bg-[hsl(var(--home2-accent-light))] text-lg px-8 py-6">
                    <Crosshair className="mr-2 h-5 w-5" />
                    Browse Firearms
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {topFirearms.map((firearm, index) => (
                <Card key={firearm.id} className={`home2-card-hover border-2 ${index === 0 ? 'col-span-2' : ''}`}>
                  <CardContent className="p-6">
                    <div className="relative">
                      {firearm.imageUrl && (
                        <img 
                          src={firearm.imageUrl} 
                          alt={firearm.name} 
                          className="w-full h-32 object-contain mb-4"
                        />
                      )}
                      <Badge className="absolute top-0 right-0 home2-primary">In Stock</Badge>
                    </div>
                    <p className="font-bold text-base mb-2 line-clamp-1">{firearm.name}</p>
                    <p className="home2-accent font-bold text-xl">${firearm.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b bg-[hsl(var(--home2-dark))] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{feature.title}</h3>
                  <p className="text-xs opacity-80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="p-4 rounded-xl home2-accent-bg group-hover:scale-110 transition-transform">
                  <indicator.icon className="h-7 w-7 home2-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{indicator.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 home2-accent-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl lg:text-6xl font-bold home2-accent mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 home2-accent" />
              <Badge variant="outline" className="text-base border-[hsl(var(--home2-primary))] home2-accent">Popular Categories</Badge>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Shop by Ammunition Type
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              From pistol to rifle ammunition, we stock everything you need for training, 
              competition, and personal defense.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <Card className="home2-card-hover hover:home2-border cursor-pointer h-full border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg home2-accent-bg">
                        <category.icon className="h-6 w-6 home2-accent" />
                      </div>
                      <Badge variant="secondary" className="text-sm">{category.count} Products</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{category.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 home2-accent hover:opacity-80 font-semibold">
                      <span>Shop Now</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg" className="border-2 border-[hsl(var(--home2-primary))] home2-accent hover:bg-[hsl(var(--home2-accent-light))] text-lg px-8">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <CircleDot className="h-5 w-5 home2-accent" />
              <Badge variant="outline" className="text-base border-[hsl(var(--home2-primary))] home2-accent">In Stock Now</Badge>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Featured Ammunition
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Top-rated ammunition from trusted manufacturers. Ready to ship today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {topProducts.map((product) => (
              <div key={product.id} className="home2-card-hover">
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="home2-primary text-lg px-8 py-6">
                <Package className="mr-2 h-5 w-5" />
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose ARMS COMPLEX
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              We're committed to providing the best products, prices, and service in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 home2-card-hover">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl home2-accent-bg">
                      <benefit.icon className="h-7 w-7 home2-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-3">{benefit.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 home2-accent fill-current" />
              <Badge variant="outline" className="text-base border-[hsl(var(--home2-primary))] home2-accent">Customer Reviews</Badge>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Thousands of Shooters
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. See what our customers have to say about their experience.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 home2-accent fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold home2-accent">4.9</span>
              <span className="text-muted-foreground">out of 5 based on 2,847 reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="home2-card-hover border-2 relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-16 w-16 home2-accent" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">{testimonial.role}</Badge>
                    </div>
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-xs home2-accent bg-[hsl(var(--home2-accent-light))] px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        <span className="font-semibold">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'home2-accent fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-[hsl(var(--home2-accent-light))] border-2 border-[hsl(var(--home2-primary))]">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 home2-accent fill-current" />
                <span className="text-2xl font-bold home2-accent">Excellent</span>
              </div>
              <p className="text-muted-foreground text-lg">
                Join thousands of satisfied customers who trust ARMS COMPLEX
              </p>
              <Link to="/contact">
                <Button size="lg" className="home2-primary text-lg px-8">
                  Share Your Experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 home2-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/10 mb-8 home2-glow">
              <Target className="h-12 w-12" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-95 leading-relaxed max-w-2xl mx-auto">
              Browse our extensive selection of firearms and ammunition. 
              All orders ship within 24 hours with tracking.
            </p>
            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-7 font-semibold hover:scale-105 transition-transform">
                  <CircleDot className="mr-2 h-6 w-6" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/20 font-semibold hover:scale-105 transition-transform">
                  <Phone className="mr-2 h-6 w-6" />
                  Contact Us
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10">
                <Shield className="h-8 w-8" />
                <span className="font-semibold">Licensed FFL Dealer</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10">
                <Lock className="h-8 w-8" />
                <span className="font-semibold">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10">
                <Truck className="h-8 w-8" />
                <span className="font-semibold">Fast Shipping</span>
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
