import { useState } from "react";
import { Star, TrendingUp, Plus } from "lucide-react";
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

export default function Reviews5() {
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
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-warning text-warning drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-muted"}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,40%,8%)] via-background to-[hsl(220,40%,8%)]">
      <title>Expert Reviews | Arms Complex</title>
      <meta name="description" content="Read expert and customer reviews of top firearms, ammunition, and tactical gear at Arms Complex." />
      
      {/* Gradient Hero */}
      <div className="relative h-72 bg-gradient-to-br from-[hsl(220,70%,20%)] via-[hsl(220,60%,30%)] to-[hsl(220,80%,25%)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="text-center z-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-12 w-12 text-warning animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-4 tracking-tight">
            Expert Reviews
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Trusted insights from professionals and enthusiasts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72">
            <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 shadow-xl">
              <div className="p-6 space-y-6">
                <div>
                  <Label className="text-lg font-bold mb-4 block flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    Rating Filter
                  </Label>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-3 group">
                        <Checkbox
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings([...selectedRatings, rating]);
                            } else {
                              setSelectedRatings(selectedRatings.filter(r => r !== rating));
                            }
                          }}
                          className="border-primary/50"
                        />
                        <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                          {renderStars(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-6">
                  <Label className="text-lg font-bold mb-4 block">Category</Label>
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
                          className="border-primary/50"
                        />
                        <Label className="cursor-pointer">{type}</Label>
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
                <span className="text-3xl font-bold text-foreground">{filteredReviews.length}</span> expert reviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedReviews.map(review => (
                <Card 
                  key={review.id} 
                  className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                      {renderStars(review.rating)}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {review.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.reviewSummary}
                    </p>
                    <div className="border-t border-primary/20 pt-4">
                      <p className="text-sm font-semibold text-foreground">{review.reviewerName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">{new Date(review.reviewDate).toLocaleDateString()}</p>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          {review.productType}
                        </span>
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
