export interface DocStep {
  titleKey: string;
  contentKey: string;
  codeKey?: string;
}

export interface DocSection {
  id: string;
  headingKey: string;
  descriptionKey: string;
  steps: DocStep[];
}
