import { useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const mockReviews = [
  { id: 1, productName: "Glock 17 Gen5 MOS", rating: 5, summary: "The gold standard for duty pistols. Unmatched reliability and aftermarket support.", reviewer: "Deputy Chief Roberts", date: "2024-03-24", type: "Firearms", price: 599 },
  { id: 2, productName: "Federal Premium Guard Dog", rating: 5, summary: "Innovative expanding full metal jacket design. Perfect for home defense with reduced over-penetration.", reviewer: "Home Defense Expert", date: "2024-03-23", type: "Ammunition", price: 29 },
  { id: 3, productName: "Nightforce ATACR", rating: 5, summary: "Absolute best-in-class long-range optic. Worth every penny for serious precision work.", reviewer: "Competition Shooter", date: "2024-03-21", type: "Accessories", price: 3299 },
  { id: 4, productName: "BCM MCMR AR-15", rating: 5, summary: "Battle-proven reliability with lightweight design. My go-to defensive carbine.", reviewer: "Instructor Mike Reynolds", date: "2024-03-19", type: "Firearms", price: 1499 },
  { id: 5, productName: "PMC Bronze .223", rating: 4, summary: "Consistent bulk ammunition for training. Great value and reliability.", reviewer: "Range Master Tom", date: "2024-03-17", type: "Ammunition", price: 19 },
  { id: 6, productName: "Blue Force Gear Vickers Sling", rating: 5, summary: "Bombproof tactical sling. Smooth adjustments and incredible durability.", reviewer: "Tactical Trainer", date: "2024-03-15", type: "Accessories", price: 58 },
  { id: 7, productName: "Canik TP9 Elite Combat", rating: 4, summary: "Outstanding value for a competition-ready pistol. Great trigger and optics-ready.", reviewer: "USPSA Competitor", date: "2024-03-13", type: "Firearms", price: 749 },
  { id: 8, productName: "Barnes VOR-TX", rating: 5, summary: "Premium hunting ammunition with devastating terminal performance. All-copper bullets.", reviewer: "Hunter Jake Wilson", date: "2024-03-11", type: "Ammunition", price: 48 },
  { id: 9, productName: "Crye Precision JPC 2.0", rating: 5, summary: "Best plate carrier on the market. Lightweight, low-profile, incredibly comfortable.", reviewer: "Special Operations", date: "2024-03-09", type: "Accessories", price: 249 },
];

export default function Reviews5() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = mockReviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.type)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-warning text-warning drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,40%,8%)] via-background to-[hsl(220,40%,8%)]">
      <title>Expert Reviews | Arms Complex</title>
      <meta name="description" content="Read expert and customer reviews of top firearms, ammunition, and tactical gear at Arms Complex." />
      
      {/* Gradient Hero */}
      <div className="relative h-72 bg-gradient-to-br from-[hsl(220,70%,20%)] via-[hsl(220,60%,30%)] to-[hsl(220,80%,25%)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-12 w-12 text-warning animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-4 tracking-tight">
            Expert Reviews
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Trusted insights from professionals and enthusiasts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 shadow-xl">
              <div className="p-6 space-y-6">
                <div>
                  <Label className="text-lg font-bold mb-4 block flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    Rating Filter
                  </Label>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-3 group">
                        <Checkbox
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings([...selectedRatings, rating]);
                            } else {
                              setSelectedRatings(selectedRatings.filter(r => r !== rating));
                            }
                          }}
                          className="border-primary/50"
                        />
                        <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                          {renderStars(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-6">
                  <Label className="text-lg font-bold mb-4 block">Category</Label>
                  <div className="space-y-3">
                    {["Ammunition", "Firearms", "Accessories"].map(type => (
                      <div key={type} className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                          className="border-primary/50"
                        />
                        <Label className="cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <p className="text-muted-foreground text-lg">
                <span className="text-3xl font-bold text-foreground">{filteredReviews.length}</span> expert reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.summary}
                    </p>
                    <div className="border-t border-primary/20 pt-4">
                      <p className="text-sm font-semibold text-foreground">{review.reviewer}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          {review.type}
                        </span>
                      </div>
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
