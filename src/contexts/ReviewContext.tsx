import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Review, reviews as initialReviews } from '@/data/reviews';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'reviewDate'>) => void;
  getReviewById: (id: string) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    // Load reviews from localStorage or use initial data
    const stored = localStorage.getItem('userReviews');
    const userReviews = stored ? JSON.parse(stored) : [];
    return [...initialReviews, ...userReviews];
  });

  // Save user reviews to localStorage whenever they change
  useEffect(() => {
    const userReviews = reviews.filter(r => r.id.startsWith('user-'));
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'reviewDate'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `user-${Date.now()}`,
      reviewDate: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getReviewById = (id: string) => {
    return reviews.find(r => r.id === id);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewById }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};
