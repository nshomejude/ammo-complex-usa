import { useState } from "react";
import { Star, BarChart3, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Review } from "@/data/reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useReviews } from "@/contexts/ReviewContext";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";

export default function Reviews10() {
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{filteredReviews.length} Reviews</h2>
          <Dialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Write Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submit Your Review</DialogTitle>
              </DialogHeader>
              <ReviewSubmissionForm onSuccess={() => setShowSubmitForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
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
              {paginatedReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card border-2 border-primary/20 hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedReview(review);
                    setShowReviewModal(true);
                  }}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{review.productType}</span>
                    </div>
                    
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight leading-tight">
                      {review.productName}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.reviewSummary}
                    </p>

                    <div className="border-t-2 border-primary/20 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-foreground">{review.reviewerName}</p>
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
      
      <ReviewDetailModal 
        review={selectedReview}
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
      />
    </div>
  );
}
