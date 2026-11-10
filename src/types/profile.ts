export type SocialPlatform = 
  | 'linkedin'
  | 'github'
  | 'x'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'telegram'
  | 'tiktok'
  | 'threads'
  | 'behance'
  | 'dribbble'
  | 'whatsapp'
  | 'email'
  | 'website';

export type SocialCategory = 'all' | 'professional' | 'creative' | 'social' | 'code';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  username: string;
  url: string;
  category: SocialCategory;
  description: string;
  highlight?: boolean;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface SkillItem {
  name: string;
  level: string; // e.g., 'Advanced', 'Expert'
  category: 'Design' | 'Development' | 'Strategy' | 'Tools';
}

export interface ProfileData {
  name: string;
  title: string;
  pronouns: string;
  location: string;
  timezone: string;
  bio: string;
  aboutLong: string;
  avatarUrl: string;
  coverBannerUrl: string;
  email: string;
  phone?: string;
  availableForWork: boolean;
  availabilityNote: string;
  socialLinks: SocialLink[];
  projects: Project[];
  skills: SkillItem[];
  experiences: Experience[];
  education: Education[];
}
