import { Product } from "@/data/products";
import { Firearm } from "@/data/firearms";

/**
 * Adds default quantity variations to a product if it doesn't have them
 */
export const addProductVariations = (product: Product): Product => {
  if (product.quantityVariations && product.quantityVariations.length > 0) {
    return product;
  }

  const baseRounds = product.rounds;
  const basePrice = product.price;
  
  // Generate typical ammo box quantity variations
  const variations = [];
  
  // Single box (base)
  variations.push({
    rounds: baseRounds,
    price: basePrice,
    inStock: product.inStock,
  });
  
  // 5-pack (bulk discount ~8%)
  if (baseRounds >= 20) {
    variations.push({
      rounds: baseRounds * 5,
      price: parseFloat((basePrice * 5 * 0.92).toFixed(2)),
      inStock: product.inStock,
    });
  }
  
  // 10-pack (bulk discount ~12%)
  if (baseRounds >= 20) {
    variations.push({
      rounds: baseRounds * 10,
      price: parseFloat((basePrice * 10 * 0.88).toFixed(2)),
      inStock: product.inStock,
    });
  }
  
  // Case (20-pack, bulk discount ~15%)
  if (baseRounds >= 20) {
    variations.push({
      rounds: baseRounds * 20,
      price: parseFloat((basePrice * 20 * 0.85).toFixed(2)),
      inStock: product.inStock,
    });
  }

  return {
    ...product,
    quantityVariations: variations,
  };
};

/**
 * Adds default quantity variations to a firearm if it doesn't have them
 */
export const addFirearmVariations = (firearm: Firearm): Firearm => {
  if (firearm.quantityVariations && firearm.quantityVariations.length > 0) {
    return firearm;
  }

  const basePrice = firearm.price;
  
  // Generate typical firearm quantity variations
  const variations = [
    {
      quantity: 1,
      price: basePrice,
      inStock: firearm.inStock,
    },
    {
      quantity: 2,
      price: parseFloat((basePrice * 2 * 0.95).toFixed(2)), // 5% discount
      inStock: firearm.inStock,
    },
    {
      quantity: 5,
      price: parseFloat((basePrice * 5 * 0.90).toFixed(2)), // 10% discount
      inStock: firearm.inStock,
    },
  ];

  return {
    ...firearm,
    quantityVariations: variations,
  };
};
