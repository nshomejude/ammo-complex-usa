import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const mockReviews = [
  { id: 1, productName: "Colt 1911 Government", rating: 5, summary: "Timeless classic with over a century of proven performance. Beautifully crafted and incredibly accurate.", reviewer: "John Browning Fan", date: "2024-03-26", type: "Firearms", price: 899 },
  { id: 2, productName: "Remington UMC 9mm", rating: 4, summary: "Dependable bulk ammunition for high-volume training. Consistent performance at a budget-friendly price.", reviewer: "Training Coordinator", date: "2024-03-25", type: "Ammunition", price: 17 },
  { id: 3, productName: "Harris Bipod", rating: 5, summary: "Rock-solid stability for precision shooting. Spring-loaded legs and smooth panning.", reviewer: "Long Range Shooter", date: "2024-03-23", type: "Accessories", price: 99 },
  { id: 4, productName: "Ruger American Rifle", rating: 5, summary: "Outstanding accuracy straight from the box. Incredible value for a precision bolt-action.", reviewer: "Hunter Mike Davis", date: "2024-03-21", type: "Firearms", price: 499 },
  { id: 5, productName: "Hornady Frontier 5.56", rating: 4, summary: "Quality Lake City brass with Hornady bullets. Great for semi-auto rifles.", reviewer: "AR Enthusiast", date: "2024-03-19", type: "Ammunition", price: 27 },
  { id: 6, productName: "Blackhawk SERPA Holster", rating: 3, summary: "Secure retention but requires practice for smooth draw. Good budget option.", reviewer: "Deputy Sheriff", date: "2024-03-17", type: "Accessories", price: 45 },
  { id: 7, productName: "Savage Axis II Precision", rating: 5, summary: "Sub-MOA accuracy at an unbeatable price point. Perfect for new precision shooters.", reviewer: "Precision Instructor", date: "2024-03-15", type: "Firearms", price: 549 },
  { id: 8, productName: "Federal American Eagle", rating: 4, summary: "Reliable range ammunition with clean-burning powder. Great for practice sessions.", reviewer: "Range Regular", date: "2024-03-13", type: "Ammunition", price: 20 },
  { id: 9, productName: "Bushnell TRS-25 Red Dot", rating: 4, summary: "Budget-friendly red dot that holds zero surprisingly well. Great for first-time optic users.", reviewer: "Budget Shooter", date: "2024-03-11", type: "Accessories", price: 69 },
];

export default function Reviews7() {
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredReviews = mockReviews.filter(review => {
    if (ratingFilter !== "all" && review.rating !== parseInt(ratingFilter)) return false;
    if (typeFilter !== "all" && review.type !== typeFilter) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      <title>Customer Feedback | Arms Complex</title>
      <meta name="description" content="Explore genuine customer feedback and reviews for firearms, ammunition, and accessories at Arms Complex." />
      
      {/* Minimalist Hero */}
      <div className="relative h-80 flex items-center justify-center border-b border-border">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <ThumbsUp className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-foreground mb-6 tracking-tight">
            Customer Feedback
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Authentic reviews from our valued customers who trust Arms Complex for their firearms and ammunition needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Minimalist Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="space-y-8">
              <div>
                <Label className="text-2xl font-light mb-6 block text-foreground">Filter by Rating</Label>
                <RadioGroup value={ratingFilter} onValueChange={setRatingFilter}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all-ratings" />
                      <Label htmlFor="all-ratings" className="text-lg font-light cursor-pointer">All Ratings</Label>
                    </div>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-3">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer">
                          <div className="flex">{renderStars(rating)}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="border-t border-border pt-8">
                <Label className="text-2xl font-light mb-6 block text-foreground">Product Type</Label>
                <RadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all-types" />
                      <Label htmlFor="all-types" className="text-lg font-light cursor-pointer">All Products</Label>
                    </div>
                    {["Ammunition", "Firearms", "Accessories"].map(type => (
                      <div key={type} className="flex items-center space-x-3">
                        <RadioGroupItem value={type} id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`} className="text-lg font-light cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="mb-10">
              <p className="text-lg font-light text-muted-foreground">
                <span className="text-4xl text-foreground font-light">{filteredReviews.length}</span> customer reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredReviews.map(review => (
                <Card key={review.id} className="bg-card border border-border hover:shadow-xl transition-shadow duration-500">
                  <div className="p-8 space-y-5">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-2xl font-light text-foreground">{review.productName}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed font-light">
                      {review.summary}
                    </p>
                    <div className="border-t border-border pt-5">
                      <p className="text-sm font-medium text-foreground">{review.reviewer}</p>
                      <p className="text-sm text-muted-foreground mt-2 font-light">{review.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
