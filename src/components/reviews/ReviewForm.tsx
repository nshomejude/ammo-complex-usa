import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  comment: z.string()
    .trim()
    .min(20, "Review must be at least 20 characters")
    .max(1000, "Review must be less than 1000 characters")
});

interface ReviewFormProps {
  productId: string;
  productType?: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({ productId, productType = 'product', onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate input
    const result = reviewSchema.safeParse({ rating, title, comment });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to submit a review");
        return;
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          product_type: productType,
          user_id: user.id,
          rating: result.data.rating,
          title: result.data.title,
          comment: result.data.comment
        });

      if (error) throw error;

      toast.success("Review submitted successfully!");
      
      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Rating *</label>
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size={32}
            />
            {errors.rating && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.rating}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <label htmlFor="title" className="text-sm font-medium mb-2 block">
              Review Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your experience in one line"
              maxLength={100}
            />
            {errors.title && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.title}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-medium mb-2 block">
              Your Review *
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={5}
              maxLength={1000}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/1000 characters
            </p>
            {errors.comment && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.comment}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
