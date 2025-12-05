
export type Category = 'Mental Wellness' | 'Mindset' | 'Business & Strategy' | 'Personal Growth' | 'Lifestyle & Learning' | 'Fitness' | 'Healthcare' | 'Medical Tourism';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML string for simplicity in this demo
  category: Category;
  readTime: string;
  date: string;
  imageUrl: string;
  author: string;
}

export interface NavItem {
  label: string;
  path: string;
}