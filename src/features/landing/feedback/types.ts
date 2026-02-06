export type FeedbackCategory = "feature" | "bug" | "improvement" | "other";

export interface FeedbackCategoryOption {
  value: FeedbackCategory;
  labelKey: string;
}
