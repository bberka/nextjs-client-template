export type ChangeType = "added" | "changed" | "fixed" | "removed";

export interface ChangeItem {
  type: ChangeType;
  descriptionKey: string;
}

export interface ChangelogRelease {
  version: string;
  dateKey: string;
  titleKey: string;
  changes: ChangeItem[];
}
