import { useState } from "react";
import { Star, Target, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Review } from "@/data/reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useReviews } from "@/contexts/ReviewContext";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";

export default function Reviews9() {
  const { reviews } = useReviews();
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

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
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-tactical text-tactical" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(84,10%,15%)] via-background to-[hsl(84,10%,15%)]">
      <title>Military Grade Reviews | Arms Complex</title>
      <meta name="description" content="Military and law enforcement reviews of professional-grade firearms, ammunition, and tactical equipment." />
      
      {/* Military Stencil Hero */}
      <div className="relative h-80 bg-gradient-to-r from-tactical via-[hsl(84,28%,25%)] to-tactical flex items-center justify-center border-y-4 border-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_12px)]"></div>
        </div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center mb-6">
            <Target className="h-20 w-20 text-primary-foreground" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-primary-foreground mb-4 uppercase tracking-widest" style={{ fontFamily: 'Impact, sans-serif' }}>
            MILITARY GRADE
          </h1>
          <p className="text-2xl text-primary-foreground/90 font-black uppercase tracking-wider">BATTLE TESTED REVIEWS</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Rugged Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-card border-4 border-tactical shadow-2xl">
              <div className="p-6 space-y-6">
                <div className="pb-4 border-b-4 border-tactical">
                  <h2 className="text-2xl font-black uppercase text-tactical tracking-wider">FILTERS</h2>
                </div>

                <div>
                  <Label className="text-base font-black mb-4 block uppercase tracking-wide text-muted-foreground">RATING</Label>
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
                          className="border-2 border-tactical"
                        />
                        <div className="flex items-center gap-1">
                          {renderStars(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-4 border-border pt-6">
                  <Label className="text-base font-black mb-4 block uppercase tracking-wide text-muted-foreground">CATEGORY</Label>
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
                          className="border-2 border-tactical"
                        />
                        <Label className="font-black uppercase">{type}</Label>
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
              <p className="text-muted-foreground text-lg font-bold uppercase">
                <span className="text-4xl font-black text-tactical">{filteredReviews.length}</span> REVIEWS
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card border-4 border-border hover:border-tactical hover:shadow-2xl hover:shadow-tactical/30 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight leading-tight">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                      {review.reviewSummary}
                    </p>
                    <div className="border-t-4 border-border pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-black text-foreground uppercase tracking-wide">{review.reviewerName}</p>
                        <span className="text-xs font-black text-tactical uppercase bg-tactical/10 px-2 py-1">{review.productType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground font-bold">{new Date(review.reviewDate).toLocaleDateString()}</p>
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
