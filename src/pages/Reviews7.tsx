import { useState } from "react";
import { Star, ThumbsUp, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Review } from "@/data/reviews";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useReviews } from "@/contexts/ReviewContext";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewSubmissionForm } from "@/components/ReviewSubmissionForm";

export default function Reviews7() {
  const { reviews } = useReviews();
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const filteredReviews = reviews.filter(review => {
    if (ratingFilter !== "all" && review.rating < parseInt(ratingFilter)) return false;
    if (typeFilter !== "all" && review.productType !== typeFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      <title>Customer Feedback | Arms Complex</title>
      <meta name="description" content="Explore genuine customer feedback and reviews for firearms, ammunition, and accessories at Arms Complex." />
      
      {/* Minimalist Hero */}
      <div className="relative h-80 flex items-center justify-center border-b border-border">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <ThumbsUp className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-foreground mb-6 tracking-tight">
            Customer Feedback
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Authentic reviews from our valued customers who trust Arms Complex for their firearms and ammunition needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Minimalist Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="space-y-8">
              <div>
                <Label className="text-2xl font-light mb-6 block text-foreground">Filter by Rating</Label>
                <RadioGroup value={ratingFilter} onValueChange={setRatingFilter}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all-ratings" />
                      <Label htmlFor="all-ratings" className="text-lg font-light cursor-pointer">All Ratings</Label>
                    </div>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-3">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer">
                          <div className="flex">{renderStars(rating)}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="border-t border-border pt-8">
                <Label className="text-2xl font-light mb-6 block text-foreground">Product Type</Label>
                <RadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all-types" />
                      <Label htmlFor="all-types" className="text-lg font-light cursor-pointer">All Products</Label>
                    </div>
                    {["Ammunition", "Firearms", "Accessories"].map(type => (
                      <div key={type} className="flex items-center space-x-3">
                        <RadioGroupItem value={type} id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`} className="text-lg font-light cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </aside>

          {/* Reviews Grid */}
          <div className="flex-1">
            <div className="mb-10">
              <p className="text-lg font-light text-muted-foreground">
                <span className="text-4xl text-foreground font-light">{filteredReviews.length}</span> customer reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {paginatedReviews.map(review => (
                <Card key={review.id} className="bg-card border border-border hover:shadow-xl transition-shadow duration-500">
                  <div className="p-8 space-y-5">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-2xl font-light text-foreground">{review.productName}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed font-light">
                      {review.reviewSummary}
                    </p>
                    <div className="border-t border-border pt-5">
                      <p className="text-sm font-medium text-foreground">{review.reviewerName}</p>
                      <p className="text-sm text-muted-foreground mt-2 font-light">{new Date(review.reviewDate).toLocaleDateString()}</p>
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
