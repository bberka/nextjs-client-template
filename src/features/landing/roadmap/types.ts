export interface RoadmapItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  badgeKey?: string;
}

export interface RoadmapColumn {
  id: string;
  headingKey: string;
  descriptionKey: string;
  items: RoadmapItem[];
}
