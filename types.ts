export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  likes: number;
  isGlitch?: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  level: number;
  bio: string;
  stats: {
    ram: number;
    cpu: number;
    network: number;
  };
}

export enum ViewState {
  LIST = 'LIST',
  DETAIL = 'DETAIL'
}

export enum NavItem {
  HOME = 'HOME',
  NET = 'NET',
  GEAR = 'GEAR',
  FILES = 'FILES'
}
