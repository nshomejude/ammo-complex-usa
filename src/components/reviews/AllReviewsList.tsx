import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { User, ThumbsUp, ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products as rawProducts } from "@/data/products";
import { firearms } from "@/data/firearms";
import { addProductVariations } from "@/utils/addDefaultVariations";

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  helpful_count: number;
  verified_purchase: boolean;
  created_at: string;
  user_id: string;
  product_id: string;
  product_type: string;
  profiles?: {
    username: string | null;
  } | null;
}

export const AllReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');
  const products = rawProducts.map(addProductVariations);

  useEffect(() => {
    fetchAllReviews();
  }, [sortBy]);

  const fetchAllReviews = async () => {
    try {
      let query = supabase
        .from('reviews')
        .select('*');

      // Apply sorting
      switch (sortBy) {
        case 'highest':
          query = query.order('rating', { ascending: false });
          break;
        case 'lowest':
          query = query.order('rating', { ascending: true });
          break;
        case 'helpful':
          query = query.order('helpful_count', { ascending: false });
          break;
        case 'recent':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch profiles separately
      const reviewsWithProfiles = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', review.user_id)
            .single();
          
          return {
            ...review,
            profiles: profileData
          };
        })
      );

      setReviews(reviewsWithProfiles);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId: string, productType: string) => {
    if (productType === 'firearm') {
      const firearm = firearms.find(f => f.id === productId);
      return firearm ? `${firearm.manufacturer} ${firearm.name}` : 'Unknown Firearm';
    } else {
      const product = products.find(p => p.id === productId);
      return product?.name || 'Unknown Product';
    }
  };

  const getProductLink = (productId: string, productType: string, reviewId: string) => {
    const basePath = productType === 'firearm' ? '/firearm' : '/product';
    return `${basePath}/${productId}#review-${reviewId}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">All Customer Reviews</h2>
          <p className="text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} across all products
          </p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="p-12">
            <p className="text-center text-muted-foreground">
              No reviews yet. Be the first to review a product!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} id={`review-${review.id}`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Product Link */}
                  <Link 
                    to={getProductLink(review.product_id, review.product_type, review.id)}
                    className="group"
                  >
                    <div className="flex items-center gap-2 text-sm text-tactical hover:underline">
                      <Badge variant="outline" className="capitalize">
                        {review.product_type}
                      </Badge>
                      <span className="font-medium">{getProductName(review.product_id, review.product_type)}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>

                  <Separator />

                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size={16} />
                        <span className="font-semibold">{review.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{review.profiles?.username || 'Anonymous'}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                        </span>
                        {review.verified_purchase && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed">{review.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-2"
                      disabled
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">Helpful ({review.helpful_count})</span>
                    </Button>

                    <Link to={getProductLink(review.product_id, review.product_type, review.id)}>
                      <Button variant="outline" size="sm">
                        View Product
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
