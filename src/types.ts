export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface SkillItem {
  name: string;
  category: 'AI' | 'Development' | 'Design' | 'Other';
  level: number; // 1-100
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured: boolean;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}
