import { useState } from "react";
import { Star, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const mockReviews = [
  { id: 1, productName: "HK VP9", rating: 5, summary: "German engineering excellence. Ergonomics are phenomenal and reliability is unquestionable.", reviewer: "Security Professional", date: "2024-03-25", type: "Firearms", price: 749, verified: true },
  { id: 2, productName: "Speer Lawman 9mm", rating: 4, summary: "Clean-burning practice ammunition. Total metal jacket design reduces lead exposure at indoor ranges.", reviewer: "Range Safety Officer", date: "2024-03-24", type: "Ammunition", price: 21, verified: true },
  { id: 3, productName: "Scalarworks LEAP Mount", rating: 5, summary: "Precision-machined perfection. Rock-solid optic mounting with return-to-zero capability.", reviewer: "Precision Rifle Specialist", date: "2024-03-22", type: "Accessories", price: 139, verified: true },
  { id: 4, productName: "Sig Sauer P365XL", rating: 5, summary: "Revolutionary micro-compact. High capacity in a slim, shootable package.", reviewer: "CCW Instructor", date: "2024-03-20", type: "Firearms", price: 649, verified: true },
  { id: 5, productName: "Barnes TAC-XPD", rating: 5, summary: "All-copper defensive ammunition. Deep penetration with consistent expansion.", reviewer: "Ballistic Expert", date: "2024-03-18", type: "Ammunition", price: 42, verified: true },
  { id: 6, productName: "Wiley X Valor Glasses", rating: 4, summary: "Ballistic-rated eye protection with excellent clarity. Comfortable for all-day wear.", reviewer: "Tactical Training Center", date: "2024-03-16", type: "Accessories", price: 89, verified: true },
  { id: 7, productName: "Wilson Combat EDC X9", rating: 5, summary: "Custom-grade 1911 perfection. Worth every penny for discerning shooters.", reviewer: "1911 Enthusiast", date: "2024-03-14", type: "Firearms", price: 2995, verified: true },
  { id: 8, productName: "Fiocchi Shooting Dynamics", rating: 4, summary: "Italian quality at a reasonable price. Consistent performance for training sessions.", reviewer: "Competitive Shooter", date: "2024-03-12", type: "Ammunition", price: 23, verified: true },
  { id: 9, productName: "Modlite OKW Light", rating: 5, summary: "Incredible throw for positive target identification. Industry-leading candela output.", reviewer: "Low-Light Instructor", date: "2024-03-10", type: "Accessories", price: 329, verified: true },
];

export default function Reviews6() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = mockReviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.type)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-tactical text-tactical" : "text-border"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Tactical Reviews | Arms Complex</title>
      <meta name="description" content="Professional tactical equipment reviews from verified Arms Complex customers and industry experts." />
      
      {/* Tactical Hero */}
      <div className="relative h-64 bg-gradient-to-r from-tactical via-primary to-tactical flex items-center justify-center border-b-4 border-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)]"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-3 uppercase tracking-wider">
            Tactical Reviews
          </h1>
          <p className="text-xl text-primary-foreground/90 font-semibold">VERIFIED BY PROFESSIONALS</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-card border-2 border-tactical shadow-lg">
              <div className="p-6 space-y-6">
                <div className="border-b-2 border-tactical pb-4">
                  <h2 className="text-xl font-black uppercase text-tactical">Filters</h2>
                </div>

                <div>
                  <Label className="text-base font-bold mb-4 block uppercase text-muted-foreground">Rating</Label>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-3">
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

                <div className="border-t-2 border-border pt-6">
                  <Label className="text-base font-bold mb-4 block uppercase text-muted-foreground">Category</Label>
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
                        />
                        <Label className="font-semibold">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground text-lg">
                <span className="text-3xl font-black text-foreground">{filteredReviews.length}</span> Reviews
              </p>
              <Badge variant="outline" className="text-sm font-bold">ALL VERIFIED</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card border-2 border-border hover:border-tactical hover:shadow-2xl hover:shadow-tactical/20 transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      {review.verified && (
                        <Badge className="bg-tactical text-tactical-foreground">VERIFIED</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight group-hover:text-tactical transition-colors">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.summary}
                    </p>
                    <div className="border-t-2 border-border pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-foreground uppercase">{review.reviewer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">PRICE</p>
                          <p className="text-lg font-black text-tactical">${review.price}</p>
                        </div>
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
