import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AllReviewsList } from "@/components/reviews/AllReviewsList";
import { useEffect } from "react";

export default function Reviews1() {
  useEffect(() => {
    document.title = "Customer Reviews | Arms Complex";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read authentic customer reviews of firearms, ammunition, and tactical accessories from Arms Complex customers.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <div className="relative h-48 bg-gradient-to-br from-tactical via-background to-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Customer Reviews</h1>
          <p className="text-muted-foreground">Real feedback from real shooters</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AllReviewsList />
      </div>

      <Footer />
    </div>
  );
}
