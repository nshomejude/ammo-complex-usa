import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const mockReviews = [
  { id: 1, productName: "Winchester Ranger T-Series", rating: 5, summary: "Law enforcement standard for good reason. Exceptional terminal performance and reliability.", reviewer: "Officer Mike Stevens", date: "2024-03-23", type: "Ammunition", price: 45 },
  { id: 2, productName: "Daniel Defense DDM4 V7", rating: 5, summary: "Premium AR-15 with exceptional build quality. Smooth operation and incredible accuracy.", reviewer: "Adam Wright", date: "2024-03-22", type: "Firearms", price: 1899 },
  { id: 3, productName: "Leupold Mark 5HD", rating: 5, summary: "Professional-grade precision optic. Crystal clear glass and reliable tracking.", reviewer: "Precision Shooter Pro", date: "2024-03-20", type: "Accessories", price: 2199 },
  { id: 4, productName: "CZ Scorpion EVO 3", rating: 4, summary: "Fun and reliable pistol-caliber carbine. Great ergonomics and surprisingly accurate.", reviewer: "Tyler Brooks", date: "2024-03-18", type: "Firearms", price: 849 },
  { id: 5, productName: "Federal Syntech 9mm", rating: 4, summary: "Clean-burning training ammo. Reduced fouling and consistent performance.", reviewer: "Range Officer Sam", date: "2024-03-16", type: "Ammunition", price: 24 },
  { id: 6, productName: "Safariland ALS Holster", rating: 5, summary: "Industry-leading retention holster. Secure carry with fast draw capability.", reviewer: "Officer Linda Cruz", date: "2024-03-14", type: "Accessories", price: 125 },
  { id: 7, productName: "Walther PDP", rating: 5, summary: "Modern polymer pistol perfection. Incredible ergonomics and trigger.", reviewer: "Jake Morrison", date: "2024-03-12", type: "Firearms", price: 649 },
  { id: 8, productName: "Hornady American Gunner", rating: 4, summary: "Solid performance ammunition at a fair price. Reliable for range and training.", reviewer: "Marcus Bell", date: "2024-03-10", type: "Ammunition", price: 26 },
  { id: 9, productName: "Peltor ComTac VI", rating: 5, summary: "Top-tier electronic hearing protection. Clear communication and excellent noise reduction.", reviewer: "Tactical Team Lead", date: "2024-03-08", type: "Accessories", price: 485 },
];

export default function Reviews4() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = mockReviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.type)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-border"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Review Center | Arms Complex</title>
      <meta name="description" content="Browse comprehensive reviews of firearms, ammunition, and tactical equipment from verified Arms Complex customers." />
      
      {/* Split-Screen Hero */}
      <div className="relative h-52 bg-gradient-to-r from-tactical via-primary to-tactical flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-foreground mb-2">Review Center</h1>
          <p className="text-primary-foreground/90 text-lg">Trusted Feedback from Real Users</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-0">
          {/* Collapsible Sidebar */}
          <aside className={cn(
            "transition-all duration-300 border-r border-border bg-card",
            sidebarCollapsed ? "w-0 overflow-hidden" : "w-80"
          )}>
            <div className="p-6 space-y-6">
              <div>
                <Label className="text-lg font-bold mb-4 block">Filter by Rating</Label>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center space-x-2">
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
              </div>

              <div className="border-t border-border pt-6">
                <Label className="text-lg font-bold mb-4 block">Product Type</Label>
                <div className="space-y-3">
                  {["Ammunition", "Firearms", "Accessories"].map(type => (
                    <div key={type} className="flex items-center space-x-2">
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
              </div>
            </div>
          </aside>

          {/* Toggle Button */}
          <div className="flex flex-col justify-start pt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-r-md rounded-l-none"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Reviews Grid */}
          <div className="flex-1 pl-8">
            <div className="mb-8">
              <p className="text-muted-foreground text-lg">
                Showing <span className="font-bold text-foreground text-2xl">{filteredReviews.length}</span> reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card key={review.id} className="bg-card border border-border hover:border-primary transition-colors duration-300 hover:shadow-lg">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{review.productName}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.summary}</p>
                    <div className="border-t border-border pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-foreground">{review.reviewer}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary">${review.price}</span>
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
