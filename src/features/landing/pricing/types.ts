export interface PricingPlan {
  nameKey: string;
  priceKey: string;
  descriptionKey: string;
  featureKeys: string[];
  highlighted?: boolean;
  badgeKey?: string;
  ctaKey: string;
}
