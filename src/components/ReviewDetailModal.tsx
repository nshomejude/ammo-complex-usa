import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Review } from "@/data/reviews";

interface ReviewDetailModalProps {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReviewDetailModal = ({ review, open, onOpenChange }: ReviewDetailModalProps) => {
  if (!review) return null;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {review.productName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-3">
            {renderStars(review.rating)}
            <span className="text-sm text-muted-foreground">
              {review.rating}.0 out of 5
            </span>
          </div>

          {/* Product Info */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="capitalize">{review.productType}</span>
            <span>•</span>
            <span>ID: {review.productId}</span>
          </div>

          {/* Review Content */}
          <div className="pt-4 border-t border-border">
            <p className="text-foreground leading-relaxed">
              {review.reviewSummary}
            </p>
          </div>

          {/* Reviewer Info */}
          <div className="flex justify-between items-center pt-4 border-t border-border text-sm">
            <div>
              <p className="font-semibold text-foreground">{review.reviewerName}</p>
              <p className="text-muted-foreground">Verified Purchaser</p>
            </div>
            <p className="text-muted-foreground">
              {new Date(review.reviewDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
