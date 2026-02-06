export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  dateKey: string;
  authorKey: string;
  tagKeys: string[];
  contentKeys: string[];
}
