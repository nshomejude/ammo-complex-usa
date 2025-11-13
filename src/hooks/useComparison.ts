import { useState, useEffect } from 'react';

const COMPARISON_KEY = 'shop_comparison';
const MAX_COMPARISON = 4;

export const useComparison = () => {
  const [comparison, setComparison] = useState<string[]>(() => {
    const stored = localStorage.getItem(COMPARISON_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(comparison));
  }, [comparison]);

  const addToComparison = (productId: string) => {
    if (comparison.length >= MAX_COMPARISON) {
      return false;
    }
    setComparison(prev => [...prev, productId]);
    return true;
  };

  const removeFromComparison = (productId: string) => {
    setComparison(prev => prev.filter(id => id !== productId));
  };

  const toggleComparison = (productId: string) => {
    if (comparison.includes(productId)) {
      removeFromComparison(productId);
      return true;
    } else {
      return addToComparison(productId);
    }
  };

  const isInComparison = (productId: string) => comparison.includes(productId);

  const clearComparison = () => setComparison([]);

  const canAddMore = comparison.length < MAX_COMPARISON;

  return {
    comparison,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    isInComparison,
    clearComparison,
    comparisonCount: comparison.length,
    canAddMore,
    maxComparison: MAX_COMPARISON,
  };
};
