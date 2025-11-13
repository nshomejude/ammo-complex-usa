import { useState } from "react";
import { Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { reviews } from "@/data/reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Reviews8() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredReviews = reviews.filter(review => {
    if (selectedRatings.length > 0 && !selectedRatings.includes(review.rating)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(review.productType)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

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
              {paginatedReviews.map(review => (
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
                      {review.reviewSummary}
                    </p>
                    <div className="border-t border-[hsl(45,93%,47%)]/20 pt-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-bold text-foreground">{review.reviewerName}</p>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(review.reviewDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
