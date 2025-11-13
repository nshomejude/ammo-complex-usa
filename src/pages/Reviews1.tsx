import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { reviews, filterReviews } from "@/data/reviews";

export default function Reviews1() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredReviews = reviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.productType)) return false;
    
    // Map price range to our review price ranges
    const priceRanges = {
      'under-50': [0, 50],
      '50-200': [50, 200],
      '200-500': [200, 500],
      'over-500': [500, 10000]
    };
    
    const reviewPriceRange = priceRanges[review.priceRange];
    const maxPrice = Math.max(reviewPriceRange[0], reviewPriceRange[1]);
    if (maxPrice < priceRange[0] || reviewPriceRange[0] > priceRange[1]) return false;
    
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-warning text-warning" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Customer Reviews | Arms Complex</title>
      <meta name="description" content="Read authentic customer reviews of firearms, ammunition, and tactical accessories from Arms Complex customers." />
      
      {/* Hero */}
      <div className="relative h-48 bg-gradient-to-br from-tactical via-background to-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Customer Reviews</h1>
          <p className="text-muted-foreground">Real feedback from real shooters</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Filter by Rating</Label>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings([...selectedRatings, rating]);
                          } else {
                            setSelectedRatings(selectedRatings.filter(r => r !== rating));
                          }
                        }}
                      />
                      <div className="flex items-center gap-1">
                        {renderStars(rating)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <Label className="text-lg font-semibold mb-4 block">Product Type</Label>
                  {["Ammunition", "Firearms", "Accessories"].map(type => (
                    <div key={type} className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <Label>{type}</Label>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <Label className="text-lg font-semibold mb-4 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">{filteredReviews.length} reviews found</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card key={review.id} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{review.productName}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{review.reviewSummary}</p>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-foreground">{review.reviewerName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.reviewDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
