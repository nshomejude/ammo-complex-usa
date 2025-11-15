import { useState, useEffect } from "react";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductReviewsProps {
  productId: string;
  productType?: string;
}

export const ProductReviews = ({ productId, productType = 'product' }: ProductReviewsProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleReviewSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <ReviewsList 
        productId={productId} 
        productType={productType}
        refreshTrigger={refreshTrigger}
      />
      
      {isAuthenticated ? (
        <ReviewForm
          productId={productId}
          productType={productType}
          onReviewSubmitted={handleReviewSubmitted}
        />
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>You must be logged in to write a review.</span>
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
