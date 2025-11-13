import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const mockReviews = [
  { id: 1, productName: "Federal Premium 9mm", rating: 5, summary: "Outstanding reliability and consistent performance. Used in competitive shooting with zero failures.", reviewer: "Mike Johnson", date: "2024-03-15", type: "Ammunition", price: 25 },
  { id: 2, productName: "Glock 19 Gen5", rating: 5, summary: "The perfect duty pistol. Reliable, accurate, and easy to maintain. Highly recommended.", reviewer: "Sarah Chen", date: "2024-03-14", type: "Firearms", price: 549 },
  { id: 3, productName: "Hornady Critical Defense", rating: 4, summary: "Excellent self-defense round with consistent expansion. Great choice for carry.", reviewer: "Tom Anderson", date: "2024-03-12", type: "Ammunition", price: 32 },
  { id: 4, productName: "Magpul PMAG Gen M3", rating: 5, summary: "Best AR-15 magazine on the market. Durable, reliable feeding, great value.", reviewer: "James Miller", date: "2024-03-10", type: "Accessories", price: 15 },
  { id: 5, productName: "SIG Sauer P320", rating: 4, summary: "Modular design is fantastic. Accurate and reliable with excellent ergonomics.", reviewer: "Lisa Rodriguez", date: "2024-03-08", type: "Firearms", price: 599 },
  { id: 6, productName: "Winchester White Box 9mm", rating: 3, summary: "Good budget training ammo. Some inconsistency but works fine for range practice.", reviewer: "David Lee", date: "2024-03-05", type: "Ammunition", price: 18 },
  { id: 7, productName: "Aimpoint PRO Red Dot", rating: 5, summary: "Professional grade optic. Clear sight picture, bomb-proof reliability.", reviewer: "Robert Williams", date: "2024-03-03", type: "Accessories", price: 425 },
  { id: 8, productName: "Remington 870 Express", rating: 5, summary: "Legendary shotgun platform. Smooth action, incredibly reliable, timeless design.", reviewer: "Kevin Brown", date: "2024-03-01", type: "Firearms", price: 399 },
  { id: 9, productName: "Speer Gold Dot .45 ACP", rating: 5, summary: "Law enforcement trusted ammunition. Exceptional expansion and penetration.", reviewer: "Amanda Garcia", date: "2024-02-28", type: "Ammunition", price: 38 },
];

export default function Reviews1() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredReviews = mockReviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.type)) return false;
    if (review.price < priceRange[0] || review.price > priceRange[1]) return false;
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
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{review.summary}</p>
                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-foreground">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
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
