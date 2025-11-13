import { Shield, Award, Package, CheckCircle, Truck, Lock, Phone, Clock, DollarSign, Star, Warehouse, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const WhyBuyFromUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Licensed FFL Dealer",
      description: "Fully licensed Federal Firearms License holder with all required state permits",
      color: "text-tactical"
    },
    {
      icon: Award,
      title: "Authorized Distributor",
      description: "Official distributor for all major ammunition and firearms manufacturers",
      color: "text-tactical"
    },
    {
      icon: Star,
      title: "A+ BBB Rating",
      description: "Exceptional customer satisfaction with industry-leading service ratings",
      color: "text-tactical"
    },
    {
      icon: CheckCircle,
      title: "100% Authentic Products",
      description: "Factory-fresh ammunition and firearms - guaranteed no counterfeits or reloads",
      color: "text-tactical"
    },
    {
      icon: Package,
      title: "Quality Inspected",
      description: "Every order inspected before shipping to ensure perfect condition",
      color: "text-tactical"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free return policy with full satisfaction guarantee",
      color: "text-tactical"
    },
    {
      icon: Truck,
      title: "Fast Secure Shipping",
      description: "Expedited shipping with full insurance and signature confirmation",
      color: "text-tactical"
    },
    {
      icon: Lock,
      title: "Discreet Packaging",
      description: "Plain, unmarked boxes with no external product identification",
      color: "text-tactical"
    },
    {
      icon: Phone,
      title: "Expert Support",
      description: "In-house firearms specialists available for technical guidance",
      color: "text-tactical"
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Best prices with bulk discounts and price match guarantee",
      color: "text-tactical"
    },
    {
      icon: Warehouse,
      title: "Climate Controlled Storage",
      description: "Professional warehouse with temperature and humidity regulation",
      color: "text-tactical"
    },
    {
      icon: Clock,
      title: "Same-Day Processing",
      description: "Orders placed before 2PM ship same business day",
      color: "text-tactical"
    }
  ];

  return (
    <section className="py-12 bg-secondary/20 rounded-lg my-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Why Buy From Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your trusted source for premium ammunition and firearms with unmatched service and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="border-2 hover:border-tactical/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-tactical/10 ${benefit.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Card className="border-tactical/30 bg-tactical/5 max-w-3xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-8 w-8 text-tactical" />
                <h3 className="text-xl font-bold">Our Commitment to You</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to providing the highest quality products, expert guidance, and exceptional service. 
                Every purchase is backed by our satisfaction guarantee and supported by our knowledgeable team of firearms professionals. 
                Your safety, satisfaction, and success are our top priorities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyFromUs;
