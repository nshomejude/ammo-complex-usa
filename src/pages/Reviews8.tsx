import { useState } from "react";
import { Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { reviews } from "@/data/reviews";
  { id: 1, productName: "IWI Tavor X95", rating: 5, summary: "Bullpup excellence. Compact, reliable, and accurate. Perfect for close-quarters and vehicle operations.", reviewer: "Military Contractor", date: "2024-03-27", type: "Firearms", price: 1899 },
  { id: 2, productName: "Underwood Ammo .357 Magnum", rating: 5, summary: "Maximum performance loads. Hot and accurate with excellent quality control.", reviewer: "Revolver Specialist", date: "2024-03-26", type: "Ammunition", price: 39 },
  { id: 3, productName: "Ferro Concepts Slickster", rating: 5, summary: "Minimalist plate carrier perfection. Lightweight, low-profile, mission-adaptable.", reviewer: "SOF Operator", date: "2024-03-24", type: "Accessories", price: 159 },
  { id: 4, productName: "CZ Shadow 2", rating: 5, summary: "Competition handgun royalty. Phenomenal trigger, excellent ergonomics, tack-driver accuracy.", reviewer: "IPSC Champion", date: "2024-03-22", type: "Firearms", price: 1299 },
  { id: 5, productName: "SIG Sauer Elite V-Crown", rating: 5, summary: "Premium defensive ammunition. Consistent expansion and deep penetration in all tests.", reviewer: "Ballistics Lab", date: "2024-03-20", type: "Ammunition", price: 36 },
  { id: 6, productName: "VTAC Padded Sling", rating: 4, summary: "Comfortable two-point sling with quick adjustments. Durable construction for hard use.", reviewer: "Tactical Instructor", date: "2024-03-18", type: "Accessories", price: 52 },
  { id: 7, productName: "Knights Armament SR-15", rating: 5, summary: "Top-tier AR-15 platform. Exceptional reliability and accuracy justify the premium price.", reviewer: "Serious Rifle Guy", date: "2024-03-16", type: "Firearms", price: 2399 },
  { id: 8, productName: "Corbon DPX", rating: 5, summary: "All-copper defensive loads with outstanding terminal performance. Barrier-blind penetration.", reviewer: "LE Armorer", date: "2024-03-14", type: "Ammunition", price: 44 },
  { id: 9, productName: "Spiritus Systems Micro Fight", rating: 5, summary: "Modular chest rig done right. Lightweight, configurable, and bombproof.", reviewer: "Gear Reviewer", date: "2024-03-12", type: "Accessories", price: 89 },
];

export default function Reviews8() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredReviews = reviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.productType)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-[hsl(45,93%,47%)] text-[hsl(45,93%,47%)]" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,12%)]">
      <title>Premium Reviews | Arms Complex</title>
      <meta name="description" content="Read premium reviews of high-end firearms, ammunition, and tactical gear from Arms Complex experts." />
      
      {/* Dark Elegant Hero */}
      <div className="relative h-72 bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,12%)] to-[hsl(0,0%,8%)] flex items-center justify-center border-b border-[hsl(45,93%,47%)]/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(45,93%,47%,0.05),transparent_70%)]"></div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center mb-6">
            <Award className="h-16 w-16 text-[hsl(45,93%,47%)]" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            Premium Reviews
          </h1>
          <p className="text-xl text-muted-foreground">Expert evaluations of elite firearms and equipment</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Dark Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-[hsl(0,0%,15%)] border border-[hsl(45,93%,47%)]/20 shadow-xl">
              <div className="p-6 space-y-6">
                <div className="pb-4 border-b border-[hsl(45,93%,47%)]/20">
                  <h2 className="text-xl font-bold text-[hsl(45,93%,47%)] uppercase tracking-wide">Filters</h2>
                </div>

                <div>
                  <Label className="text-base font-bold mb-4 block text-foreground">Rating</Label>
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
                          className="border-[hsl(45,93%,47%)]/50"
                        />
                        <div className="flex items-center gap-1">
                          {renderStars(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[hsl(45,93%,47%)]/20 pt-6">
                  <Label className="text-base font-bold mb-4 block text-foreground">Category</Label>
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
                          className="border-[hsl(45,93%,47%)]/50"
                        />
                        <Label className="text-foreground cursor-pointer">{type}</Label>
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
                <span className="text-3xl font-bold text-[hsl(45,93%,47%)]">{filteredReviews.length}</span> premium reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-[hsl(0,0%,15%)] border border-[hsl(45,93%,47%)]/20 hover:border-[hsl(45,93%,47%)]/60 hover:shadow-2xl hover:shadow-[hsl(45,93%,47%)]/10 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-xl font-bold text-foreground hover:text-[hsl(45,93%,47%)] transition-colors">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.summary}
                    </p>
                    <div className="border-t border-[hsl(45,93%,47%)]/20 pt-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-bold text-foreground">{review.reviewer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[hsl(45,93%,47%)]">${review.price}</p>
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
