import { useState } from "react";
import { Star, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { reviews } from "@/data/reviews";

export default function Reviews3() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = reviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.productType)) return false;
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
                      <Badge variant="outline" className="text-xs">{review.productType}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{review.productName}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.reviewSummary}</p>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-semibold text-foreground">{review.reviewerName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(review.reviewDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
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
