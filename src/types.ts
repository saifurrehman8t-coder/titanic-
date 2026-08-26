export type Category = 
  | 'Construction & Shipyard'
  | 'First-Class Luxury'
  | 'Steerage & Immigrants'
  | 'Key Figures & Crew'
  | 'Maiden Voyage'
  | 'Sinking Chronology'
  | 'Heroism & Tragedy'
  | 'Rescue & Inquiries'
  | 'Wreck Exploration'
  | 'Myths & Pop Culture';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: Category;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  featuredImage: string;
  imageCaption?: string;
  views: number;
  featured?: boolean;
  trending?: boolean;
  comments: Comment[];
  audioScript?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TimelineEvent {
  year: string;
  date: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  location?: string;
}
