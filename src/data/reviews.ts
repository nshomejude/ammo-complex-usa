export interface Review {
  id: string;
  productId: string;
  productName: string;
  productType: 'ammunition' | 'firearm' | 'accessory';
  rating: 1 | 2 | 3 | 4 | 5;
  reviewSummary: string;
  reviewerName: string;
  reviewDate: string;
  priceRange: 'under-50' | '50-200' | '200-500' | 'over-500';
}

export const reviews: Review[] = [
  {
    id: "rev-001",
    productId: "556-federal-xm193",
    productName: "Federal XM193 55gr FMJ",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Outstanding accuracy and reliability. Used over 1000 rounds with zero malfunctions. Perfect for training and range work.",
    reviewerName: "Mike Johnson",
    reviewDate: "2024-03-15",
    priceRange: "under-50"
  },
  {
    id: "rev-002",
    productId: "glock-17",
    productName: "Glock 17 Gen5",
    productType: "firearm",
    rating: 5,
    reviewSummary: "The gold standard for reliability. After 5000 rounds, still performs flawlessly. Excellent ergonomics and accuracy.",
    reviewerName: "Sarah Martinez",
    reviewDate: "2024-03-10",
    priceRange: "50-200"
  },
  {
    id: "rev-003",
    productId: "9mm-federal-hst",
    productName: "Federal HST 124gr JHP",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Best defensive ammunition on the market. Consistent expansion and penetration. Trust my life to this round.",
    reviewerName: "David Chen",
    reviewDate: "2024-03-08",
    priceRange: "under-50"
  },
  {
    id: "rev-004",
    productId: "ar15-rifle",
    productName: "AR-15 Tactical Rifle",
    productType: "firearm",
    rating: 4,
    reviewSummary: "Solid build quality and great accuracy out of the box. A few minor finish issues but overall excellent value.",
    reviewerName: "James Wilson",
    reviewDate: "2024-03-05",
    priceRange: "200-500"
  },
  {
    id: "rev-005",
    productId: "223-hornady-match",
    productName: "Hornady 223 Match 73gr ELD",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Incredible accuracy at long range. Sub-MOA groups consistently. Worth every penny for precision shooting.",
    reviewerName: "Robert Taylor",
    reviewDate: "2024-03-01",
    priceRange: "50-200"
  },
  {
    id: "rev-006",
    productId: "sig-p320",
    productName: "Sig Sauer P320",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Modular design is genius. Shoots smooth and accurate. Best striker-fired trigger I've used.",
    reviewerName: "Lisa Anderson",
    reviewDate: "2024-02-28",
    priceRange: "50-200"
  },
  {
    id: "rev-007",
    productId: "45acp-winchester",
    productName: "Winchester 45 ACP 230gr FMJ",
    productType: "ammunition",
    rating: 4,
    reviewSummary: "Reliable range ammunition. Good accuracy and clean burning. Minor feeding issues in one pistol.",
    reviewerName: "Thomas Brown",
    reviewDate: "2024-02-25",
    priceRange: "under-50"
  },
  {
    id: "rev-008",
    productId: "remington-870",
    productName: "Remington 870 Express",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Built like a tank. Perfect for home defense. Smooth action and reliable feeding with all ammunition types.",
    reviewerName: "Jennifer Davis",
    reviewDate: "2024-02-20",
    priceRange: "200-500"
  },
  {
    id: "rev-009",
    productId: "308-federal-gold",
    productName: "Federal Gold Medal 308 168gr BTHP",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Match-grade performance. Consistent velocities and outstanding accuracy. My go-to for competition.",
    reviewerName: "Kevin Miller",
    reviewDate: "2024-02-18",
    priceRange: "50-200"
  },
  {
    id: "rev-010",
    productId: "springfield-1911",
    productName: "Springfield 1911 Operator",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Classic design perfected. Tight tolerances and excellent trigger. Beautiful fit and finish.",
    reviewerName: "Amanda White",
    reviewDate: "2024-02-15",
    priceRange: "over-500"
  },
  {
    id: "rev-011",
    productId: "12ga-federal-tactical",
    productName: "Federal 12ga Tactical 00 Buck",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Best buckshot for home defense. Consistent patterns and reliable feeding. Professional grade quality.",
    reviewerName: "Daniel Garcia",
    reviewDate: "2024-02-12",
    priceRange: "under-50"
  },
  {
    id: "rev-012",
    productId: "ruger-1022",
    productName: "Ruger 10/22 Carbine",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Perfect first rifle. Accurate, reliable, and fun to shoot. Endless customization options available.",
    reviewerName: "Michelle Rodriguez",
    reviewDate: "2024-02-10",
    priceRange: "under-50"
  },
  {
    id: "rev-013",
    productId: "9mm-speer-gold",
    productName: "Speer Gold Dot 9mm 124gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Law enforcement proven performance. Reliable expansion and penetration. Carries with confidence.",
    reviewerName: "Chris Martinez",
    reviewDate: "2024-02-08",
    priceRange: "50-200"
  },
  {
    id: "rev-014",
    productId: "mossberg-500",
    productName: "Mossberg 500 Tactical",
    productType: "firearm",
    rating: 4,
    reviewSummary: "Great value for the price. Reliable and rugged. Action could be smoother but works perfectly.",
    reviewerName: "Brian Thompson",
    reviewDate: "2024-02-05",
    priceRange: "200-500"
  },
  {
    id: "rev-015",
    productId: "556-hornady-black",
    productName: "Hornady Black 5.56 62gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Excellent performance at a fair price. Clean burning and accurate. Great for suppressed shooting.",
    reviewerName: "Patricia Lee",
    reviewDate: "2024-02-01",
    priceRange: "under-50"
  },
  {
    id: "rev-016",
    productId: "cz-75",
    productName: "CZ 75 SP-01",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Best 9mm handgun I've owned. Superior ergonomics and accuracy. Smooth DA/SA trigger.",
    reviewerName: "Mark Wilson",
    reviewDate: "2024-01-28",
    priceRange: "50-200"
  },
  {
    id: "rev-017",
    productId: "40sw-federal-hst",
    productName: "Federal HST 40 S&W 180gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Duty-grade defensive ammunition. Consistent performance and reliable expansion. Top tier quality.",
    reviewerName: "Steven Jackson",
    reviewDate: "2024-01-25",
    priceRange: "50-200"
  },
  {
    id: "rev-018",
    productId: "smith-mp15",
    productName: "Smith & Wesson M&P15 Sport II",
    productType: "firearm",
    rating: 4,
    reviewSummary: "Excellent entry-level AR-15. Reliable and accurate. Great platform for customization.",
    reviewerName: "Karen Anderson",
    reviewDate: "2024-01-22",
    priceRange: "50-200"
  },
  {
    id: "rev-019",
    productId: "762-pmc-bronze",
    productName: "PMC Bronze 7.62x39 123gr FMJ",
    productType: "ammunition",
    rating: 4,
    reviewSummary: "Good value ammunition for AK platforms. Reliable and affordable for high-volume shooting.",
    reviewerName: "Michael Brown",
    reviewDate: "2024-01-20",
    priceRange: "under-50"
  },
  {
    id: "rev-020",
    productId: "beretta-92",
    productName: "Beretta 92FS",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Military proven reliability. Smooth shooter with excellent accuracy. Classic design that works.",
    reviewerName: "Emily Davis",
    reviewDate: "2024-01-18",
    priceRange: "50-200"
  },
  {
    id: "rev-021",
    productId: "223-winchester-white",
    productName: "Winchester 223 White Box 55gr",
    productType: "ammunition",
    rating: 4,
    reviewSummary: "Dependable range ammunition at a good price. Occasional primer issues but generally reliable.",
    reviewerName: "William Miller",
    reviewDate: "2024-01-15",
    priceRange: "under-50"
  },
  {
    id: "rev-022",
    productId: "fn-509",
    productName: "FN 509 Tactical",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Outstanding suppressor-ready pistol. Accurate and reliable. Excellent trigger for a striker-fired gun.",
    reviewerName: "Jessica Garcia",
    reviewDate: "2024-01-12",
    priceRange: "50-200"
  },
  {
    id: "rev-023",
    productId: "9mm-blazer-brass",
    productName: "Blazer Brass 9mm 115gr FMJ",
    productType: "ammunition",
    rating: 4,
    reviewSummary: "Great training ammunition. Clean and reliable. Good value for high-volume shooting.",
    reviewerName: "Richard Martinez",
    reviewDate: "2024-01-10",
    priceRange: "under-50"
  },
  {
    id: "rev-024",
    productId: "hk-vp9",
    productName: "HK VP9",
    productType: "firearm",
    rating: 5,
    reviewSummary: "German engineering excellence. Best ergonomics and trigger of any striker-fired pistol.",
    reviewerName: "Angela Wilson",
    reviewDate: "2024-01-08",
    priceRange: "50-200"
  },
  {
    id: "rev-025",
    productId: "45acp-remington-golden",
    productName: "Remington 45 ACP Golden Saber 185gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Premium defensive ammunition. Consistent expansion and penetration. Reliable feeding in all pistols.",
    reviewerName: "Joseph Lee",
    reviewDate: "2024-01-05",
    priceRange: "50-200"
  },
  {
    id: "rev-026",
    productId: "walther-ppq",
    productName: "Walther PPQ M2",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Best trigger out of the box. Accurate and reliable. Underrated pistol that deserves more recognition.",
    reviewerName: "Nancy Thompson",
    reviewDate: "2024-01-01",
    priceRange: "50-200"
  },
  {
    id: "rev-027",
    productId: "308-winchester-deer",
    productName: "Winchester 308 Deer Season XP 150gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Excellent hunting ammunition. Quick expansion and great accuracy. Dropped deer instantly.",
    reviewerName: "Charles Rodriguez",
    reviewDate: "2023-12-28",
    priceRange: "50-200"
  },
  {
    id: "rev-028",
    productId: "savage-axis",
    productName: "Savage Axis II XP",
    productType: "firearm",
    rating: 4,
    reviewSummary: "Best budget hunting rifle. Accurate and reliable. Includes scope which is a great value.",
    reviewerName: "Betty Anderson",
    reviewDate: "2023-12-25",
    priceRange: "200-500"
  },
  {
    id: "rev-029",
    productId: "556-imi-razorcore",
    productName: "IMI 5.56 RazorCore 77gr",
    productType: "ammunition",
    rating: 5,
    reviewSummary: "Premium match ammunition. Sub-MOA accuracy consistently. Perfect for competition shooting.",
    reviewerName: "Donald Martinez",
    reviewDate: "2023-12-22",
    priceRange: "50-200"
  },
  {
    id: "rev-030",
    productId: "tikka-t3x",
    productName: "Tikka T3x Lite",
    productType: "firearm",
    rating: 5,
    reviewSummary: "Incredibly accurate out of the box. Smooth bolt action. Worth every penny for serious hunters.",
    reviewerName: "Sandra Brown",
    reviewDate: "2023-12-20",
    priceRange: "over-500"
  }
];

// Helper function to filter reviews
export const filterReviews = (
  allReviews: Review[],
  filters: {
    rating?: number;
    productType?: string;
    priceRange?: string;
    dateRange?: string;
  }
) => {
  return allReviews.filter(review => {
    if (filters.rating && review.rating < filters.rating) return false;
    if (filters.productType && filters.productType !== 'all' && review.productType !== filters.productType) return false;
    if (filters.priceRange && filters.priceRange !== 'all' && review.priceRange !== filters.priceRange) return false;
    
    if (filters.dateRange && filters.dateRange !== 'all') {
      const reviewDate = new Date(review.reviewDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (filters.dateRange === 'week' && daysDiff > 7) return false;
      if (filters.dateRange === 'month' && daysDiff > 30) return false;
      if (filters.dateRange === '3months' && daysDiff > 90) return false;
    }
    
    return true;
  });
};
