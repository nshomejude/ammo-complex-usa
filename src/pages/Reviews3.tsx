import { useState } from "react";
import { Star, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const mockReviews = [
  { id: 1, productName: "Beretta 92FS", rating: 5, summary: "Classic military pistol with proven track record. Smooth trigger and excellent accuracy.", reviewer: "Tony Russo", date: "2024-03-22", type: "Firearms", price: 649 },
  { id: 2, productName: "Black Hills 5.56 NATO", rating: 5, summary: "Premium match-grade ammunition. Consistent accuracy and reliable feeding.", reviewer: "Eric Stone", date: "2024-03-21", type: "Ammunition", price: 28 },
  { id: 3, productName: "EOTech EXPS3", rating: 5, summary: "Battle-tested holographic sight. Fast target acquisition in any conditions.", reviewer: "Maya Johnson", date: "2024-03-19", type: "Accessories", price: 679 },
  { id: 4, productName: "Remington Golden Saber", rating: 4, summary: "Reliable bonded hollow point. Good expansion characteristics.", reviewer: "Bill Harper", date: "2024-03-17", type: "Ammunition", price: 35 },
  { id: 5, productName: "FN SCAR 17S", rating: 5, summary: "Premium battle rifle. Extremely reliable and accurate at distance.", reviewer: "Nathan Cross", date: "2024-03-15", type: "Firearms", price: 3499 },
  { id: 6, productName: "Magpul MS4 Sling", rating: 4, summary: "Versatile two-point sling. Quick adjustment and durable construction.", reviewer: "Lisa Chang", date: "2024-03-13", type: "Accessories", price: 65 },
  { id: 7, productName: "Aguila Super Extra .22LR", rating: 3, summary: "Budget-friendly rimfire ammo. Some occasional duds but good for plinking.", reviewer: "John Davis", date: "2024-03-11", type: "Ammunition", price: 8 },
  { id: 8, productName: "Springfield Armory Hellcat", rating: 5, summary: "Micro-compact perfection. High capacity in an ultra-concealable package.", reviewer: "Karen Mitchell", date: "2024-03-09", type: "Firearms", price: 569 },
  { id: 9, productName: "SureFire X300U-A", rating: 5, summary: "Industry standard weapon light. Bright, durable, reliable activation.", reviewer: "Derek Walsh", date: "2024-03-07", type: "Accessories", price: 279 },
  { id: 10, productName: "Norma Tactical .308", rating: 4, summary: "Quality European ammunition. Consistent performance for precision rifles.", reviewer: "Greg Anderson", date: "2024-03-05", type: "Ammunition", price: 32 },
];

export default function Reviews3() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = mockReviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.type)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Customer Testimonials | Arms Complex</title>
      <meta name="description" content="Discover what our customers say about Arms Complex firearms, ammunition, and tactical equipment." />
      
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-br from-card via-tactical to-background flex items-center justify-center border-b border-border">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Customer Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Honest reviews from experienced shooters and professionals</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Sidebar */}
          <aside className="w-full lg:w-80 lg:sticky lg:top-4 h-fit">
            <Card className="bg-card border border-border shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <SlidersHorizontal className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Filter Reviews</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Star Rating</Label>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center space-x-3">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRatings([...selectedRatings, rating]);
                              } else {
                                setSelectedRatings(selectedRatings.filter(r => r !== rating));
                              }
                            }}
                          />
                          <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer">
                            <div className="flex">{renderStars(rating)}</div>
                            <span className="text-muted-foreground">& up</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <Label className="text-base font-semibold mb-4 block">Product Category</Label>
                    <div className="space-y-3">
                      {["Ammunition", "Firearms", "Accessories"].map(type => (
                        <div key={type} className="flex items-center space-x-3">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                          />
                          <Label htmlFor={`type-${type}`} className="cursor-pointer">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Masonry-style Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <p className="text-lg">
                <span className="text-3xl font-bold text-foreground">{filteredReviews.length}</span>
                <span className="text-muted-foreground ml-2">verified reviews</span>
              </p>
            </div>
            
            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
              {filteredReviews.map(review => (
                <Card key={review.id} className="break-inside-avoid bg-card border border-border hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <Badge variant="outline" className="text-xs">{review.type}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{review.productName}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.summary}</p>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
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
