import { useState } from "react";
import { Star, Shield, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Review } from "@/data/reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useReviews } from "@/contexts/ReviewContext";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";

export default function Reviews6() {
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
              {paginatedReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card border-2 border-border hover:border-tactical hover:shadow-2xl hover:shadow-tactical/20 transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight group-hover:text-tactical transition-colors">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.reviewSummary}
                    </p>
                    <div className="border-t-2 border-border pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-foreground uppercase">{review.reviewerName}</p>
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
