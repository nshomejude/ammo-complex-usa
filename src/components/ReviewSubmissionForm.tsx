import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useReviews } from "@/contexts/ReviewContext";
import { products } from "@/data/products";
import { firearms } from "@/data/firearms";

const reviewSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  productName: z.string().min(1, "Product name is required"),
  productType: z.enum(["ammunition", "firearm", "accessory"]),
  rating: z.number().min(1).max(5),
  reviewSummary: z.string()
    .min(20, "Review must be at least 20 characters")
    .max(500, "Review must be less than 500 characters"),
  reviewerName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  priceRange: z.enum(["under-50", "50-200", "200-500", "over-500"]),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewSubmissionFormProps {
  onSuccess?: () => void;
}

export const ReviewSubmissionForm = ({ onSuccess }: ReviewSubmissionFormProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { addReview } = useReviews();
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      productType: "ammunition",
      priceRange: "under-50",
    },
  });

  const rating = form.watch("rating");
  const productType = form.watch("productType");

  // Combine products and firearms for the dropdown
  const availableProducts = [
    ...products.map(p => ({ id: p.id, name: p.name, type: 'ammunition' as const })),
    ...firearms.map(f => ({ id: f.id, name: f.name, type: 'firearm' as const }))
  ].filter(p => p.type === productType);

  const onSubmit = (data: ReviewFormData) => {
    addReview({
      productId: data.productId,
      productName: data.productName,
      productType: data.productType,
      rating: data.rating as 1 | 2 | 3 | 4 | 5,
      reviewSummary: data.reviewSummary,
      reviewerName: data.reviewerName,
      priceRange: data.priceRange,
    });
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Type */}
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("productId", "");
                  form.setValue("productName", "");
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-card border-border z-50">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="ammunition">Ammunition</SelectItem>
                  <SelectItem value="firearm">Firearm</SelectItem>
                  <SelectItem value="accessory">Accessory</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Selection */}
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  const product = availableProducts.find(p => p.id === value);
                  if (product) {
                    form.setValue("productName", product.name);
                  }
                }} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-card border-border z-50">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-border z-50 max-h-[300px]">
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Range */}
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-card border-border z-50">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-border z-50">
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-200">$50 - $200</SelectItem>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="over-500">Over $500</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Text */}
        <FormField
          control={form.control}
          name="reviewSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this product..."
                  className="min-h-[120px] bg-card border-border resize-none"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                {field.value?.length || 0} / 500 characters
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reviewer Name */}
        <FormField
          control={form.control}
          name="reviewerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="bg-card border-border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </form>
    </Form>
  );
};
