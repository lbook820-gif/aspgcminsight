export interface NewsItem {
  id: string;
  source: string;
  date: string;
  heat: number;
  title: string;
  summary: string;
  overallImpact: string;
  industryImpact: string;
  tags: string[];
  link?: string;
  isNew?: boolean;
}

export interface LegislationItem {
  id: string;
  name: string;
  status: string;
  summary: string;
  impactScope: string;
  updateTime: string;
}

export interface DynamicCard {
  id: string;
  title: string;
  articleTitle: string;
  source: string;
  date: string;
  heat: number;
  link: string;
}

export interface EnforcementCase {
  id: string;
  source: string;
  date: string;
  heat: number;
  title: string;
  summary: string;
  overallImpact: string;
  industryImpact: string;
  tags: string[];
}

export interface RegulatoryEvent {
  date: string;
  title: string;
}
