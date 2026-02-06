export interface FeatureItem {
  titleKey: string;
  descriptionKey: string;
  includedKeys: string[];
  excludedKeys?: string[];
}

export interface FeatureGroup {
  id: string;
  headingKey: string;
  descriptionKey: string;
  features: FeatureItem[];
}
