// Simple utility for getting product images
// Products should store their imageUrl directly in the data/database
// This file only provides a placeholder fallback

import placeholderImage from "@/assets/placeholder-product.jpg";

/**
 * Get the image URL for a product.
 * Products should have imageUrl set directly in their data.
 * This function is a simple fallback utility.
 */
export const getProductImage = (imageUrl?: string): string => {
  return imageUrl || placeholderImage;
};

/**
 * @deprecated Use product.imageUrl directly instead
 * Only returns placeholder now - products should store their own imageUrl
 */
export const getFirearmImage = (id: string, manufacturer?: string, actionType?: string): string => {
  return placeholderImage;
};

/**
 * @deprecated Use product.imageUrl directly instead
 * Only returns placeholder now - products should store their own imageUrl
 */
export const getAmmoImage = (id: string): string => {
  return placeholderImage;
};