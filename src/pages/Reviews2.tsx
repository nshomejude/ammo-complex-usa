import { useState } from "react";
import { Star, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockReviews = [
  { id: 1, productName: "CCI Blazer Brass 9mm", rating: 4, summary: "Reliable range ammo at a great price point. Minimal residue and consistent velocity.", reviewer: "Chris Parker", date: "2024-03-20", type: "Ammunition", price: 20 },
  { id: 2, productName: "Smith & Wesson M&P Shield", rating: 5, summary: "Perfect concealed carry firearm. Slim profile, reliable feeding, excellent accuracy.", reviewer: "Jennifer White", date: "2024-03-18", type: "Firearms", price: 449 },
  { id: 3, productName: "Trijicon MRO", rating: 5, summary: "Crystal clear optic with a huge field of view. Built like a tank.", reviewer: "Mark Thompson", date: "2024-03-16", type: "Accessories", price: 575 },
  { id: 4, productName: "Federal HST .40 S&W", rating: 5, summary: "Top-tier duty ammunition. Consistent expansion and deep penetration in gel tests.", reviewer: "Officer Dan Martinez", date: "2024-03-14", type: "Ammunition", price: 42 },
  { id: 5, productName: "Mossberg 590A1", rating: 5, summary: "Military-proven shotgun. Heavy-duty construction and absolutely reliable.", reviewer: "Jake Wilson", date: "2024-03-12", type: "Firearms", price: 599 },
  { id: 6, productName: "Vortex Viper PST", rating: 4, summary: "Excellent long-range scope with clear glass and precise adjustments.", reviewer: "Steven Clark", date: "2024-03-10", type: "Accessories", price: 899 },
  { id: 7, productName: "Sellier & Bellot 9mm", rating: 4, summary: "Quality European ammunition. Clean burning and accurate for training.", reviewer: "Paul Davis", date: "2024-03-08", type: "Ammunition", price: 22 },
  { id: 8, productName: "Ruger 10/22 Carbine", rating: 5, summary: "Legendary .22 rifle. Perfect for training, plinking, and small game hunting.", reviewer: "Rachel Green", date: "2024-03-05", type: "Firearms", price: 299 },
  { id: 9, productName: "Streamlight TLR-1 HL", rating: 5, summary: "Powerful weapon light with excellent throw. Durable and easy to activate.", reviewer: "Alex Turner", date: "2024-03-03", type: "Accessories", price: 135 },
];

export default function Reviews2() {
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  let filteredReviews = mockReviews.filter(review => {
    if (ratingFilter !== "all" && review.rating !== parseInt(ratingFilter)) return false;
    if (typeFilter !== "all" && review.type !== typeFilter) return false;
    return true;
  });

  if (sortBy === "rating-high") {
    filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "rating-low") {
    filteredReviews = [...filteredReviews].sort((a, b) => a.rating - b.rating);
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-accent text-accent" : "text-border"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <title>Product Reviews | Arms Complex</title>
      <meta name="description" content="Browse verified customer reviews of firearms, ammunition, and tactical gear from Arms Complex." />
      
      {/* Industrial Header */}
      <div className="relative h-56 bg-gradient-to-r from-tactical to-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]"></div>
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-3 tracking-tight">REVIEWS</h1>
          <p className="text-primary-foreground/90 text-lg font-semibold">VERIFIED CUSTOMER FEEDBACK</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <Card className="bg-card border-2 border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-black uppercase">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-bold uppercase mb-3 block text-muted-foreground">Rating</Label>
                  <RadioGroup value={ratingFilter} onValueChange={setRatingFilter}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="all" id="all-ratings" />
                      <Label htmlFor="all-ratings">All Ratings</Label>
                    </div>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                          {renderStars(rating)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="border-t border-border pt-6">
                  <Label className="text-sm font-bold uppercase mb-3 block text-muted-foreground">Category</Label>
                  <RadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="all" id="all-types" />
                      <Label htmlFor="all-types">All Products</Label>
                    </div>
                    {["Ammunition", "Firearms", "Accessories"].map(type => (
                      <div key={type} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={type} id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </Card>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground font-semibold">
                <span className="text-2xl text-foreground font-black">{filteredReviews.length}</span> Reviews
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating-high">Highest Rated</SelectItem>
                  <SelectItem value="rating-low">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card key={review.id} className="bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-3 uppercase tracking-tight">{review.productName}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{review.summary}</p>
                    <div className="border-t-2 border-border pt-4 flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-foreground uppercase">{review.reviewer}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <span className="text-xs font-bold text-primary uppercase bg-primary/10 px-2 py-1 rounded">{review.type}</span>
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
