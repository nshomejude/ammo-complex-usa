import { ReactNode } from "react";
import { useReviews } from "@/contexts/ReviewContext";

interface ReviewPageLayoutProps {
  children: (reviews: any[]) => ReactNode;
}

export const ReviewPageLayout = ({ children }: ReviewPageLayoutProps) => {
  const { reviews } = useReviews();
  
  return <>{children(reviews)}</>;
};
