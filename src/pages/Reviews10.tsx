import { useState } from "react";
import { Star, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { reviews } from "@/data/reviews";
  { id: 1, productName: "LWRC IC-DI", rating: 5, summary: "Piston-driven AR excellence. Cold-hammer-forged barrel delivers sub-MOA accuracy consistently.", reviewer: "3-Gun Pro", date: "2024-03-29", type: "Firearms", price: 1899, reliability: 98, accuracy: 95, value: 85 },
  { id: 2, productName: "Prvi Partizan Match", rating: 4, summary: "Serbian match ammunition offering exceptional quality at competitive prices. Great for precision work.", reviewer: "F-Class Shooter", date: "2024-03-28", type: "Ammunition", price: 28, reliability: 92, accuracy: 90, value: 95 },
  { id: 3, productName: "Safariland Protech Helmet", rating: 5, summary: "NIJ Level IIIA ballistic protection with excellent comfort for extended wear.", reviewer: "Tactical Team Member", date: "2024-03-26", type: "Accessories", price: 425, reliability: 99, accuracy: 88, value: 80 },
  { id: 4, productName: "Tikka T3x TAC A1", rating: 5, summary: "Finnish precision bolt-action. Exceptional accuracy with competition-ready features out of the box.", reviewer: "PRS Competitor", date: "2024-03-24", type: "Firearms", price: 1899, reliability: 97, accuracy: 98, value: 90 },
  { id: 5, productName: "Lapua Scenar-L", rating: 5, summary: "World-class match ammunition. The choice of champions for extreme long-range precision.", reviewer: "1000-Yard Champion", date: "2024-03-22", type: "Ammunition", price: 65, reliability: 99, accuracy: 99, value: 85 },
  { id: 6, productName: "Garmin Foretrex 701", rating: 5, summary: "Military GPS with ballistic calculator. Essential navigation tool for serious shooters.", reviewer: "Long Range Instructor", date: "2024-03-20", type: "Accessories", price: 599, reliability: 96, accuracy: 94, value: 88 },
  { id: 7, productName: "Staccato P", rating: 5, summary: "2011-style perfection. Carries like a dream and shoots like a race gun.", reviewer: "Carry Optics Champion", date: "2024-03-18", type: "Firearms", price: 2499, reliability: 98, accuracy: 97, value: 82 },
  { id: 8, productName: "Norma Match .308", rating: 5, summary: "Premium Scandinavian ammunition. Consistent velocities and excellent accuracy.", reviewer: "Match Director", date: "2024-03-16", type: "Ammunition", price: 38, reliability: 95, accuracy: 94, value: 88 },
  { id: 9, productName: "Steiner DBAL-A3", rating: 5, summary: "Civilian legal dual-beam aiming laser. Military durability with multiple modes.", reviewer: "Night Vision Operator", date: "2024-03-14", type: "Accessories", price: 1599, reliability: 98, accuracy: 96, value: 80 },
];

export default function Reviews10() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = reviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.productType)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <title>Advanced Reviews | Arms Complex</title>
      <meta name="description" content="Data-driven reviews with performance metrics for firearms, ammunition, and tactical equipment at Arms Complex." />
      
      {/* Tech Hero */}
      <div className="relative h-64 bg-gradient-to-r from-primary via-tactical to-primary flex items-center justify-center border-b-2 border-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,currentColor_50%,transparent_100%)] animate-pulse"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-3 tracking-tight">
            ADVANCED REVIEWS
          </h1>
          <p className="text-xl text-primary-foreground/90 font-semibold">Data-Driven Performance Analysis</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tech Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-card border-2 border-primary/30 shadow-lg shadow-primary/10">
              <div className="p-6 space-y-6">
                <div className="pb-4 border-b-2 border-primary/30">
                  <h2 className="text-xl font-black uppercase text-primary flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Metrics Filter
                  </h2>
                </div>

                <div>
                  <Label className="text-base font-bold mb-4 block">Star Rating</Label>
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

                <div className="border-t-2 border-primary/30 pt-6">
                  <Label className="text-base font-bold mb-4 block">Product Type</Label>
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

          {/* Reviews Grid with Metrics */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground text-lg">
                <span className="text-3xl font-black text-primary">{filteredReviews.length}</span> detailed reviews
              </p>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded">METRICS ENABLED</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card border-2 border-primary/20 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{review.type}</span>
                    </div>
                    
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight leading-tight">
                      {review.productName}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.summary}
                    </p>

                    {/* Performance Metrics */}
                    <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Reliability</span>
                          <span className="text-primary">{review.reliability}%</span>
                        </div>
                        <Progress value={review.reliability} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Accuracy</span>
                          <span className="text-primary">{review.accuracy}%</span>
                        </div>
                        <Progress value={review.accuracy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Value</span>
                          <span className="text-primary">{review.value}%</span>
                        </div>
                        <Progress value={review.value} className="h-2" />
                      </div>
                    </div>

                    <div className="border-t-2 border-primary/20 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-foreground">{review.reviewer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                        <p className="text-2xl font-black text-primary">${review.price}</p>
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
