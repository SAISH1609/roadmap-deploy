export type RoadmapSummary = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  total_topics: number;
  is_bookmarked: boolean;
};

export type User = {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string | null;
  // Profile fields
  headline?: string;
  github_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  dailydev_url?: string;
  website_url?: string;
  availableForHire?: boolean;
  profile_picture?: string;
};

export type Message = { 
  sender: "user" | "ai"; 
  text: string; 
};

export type Team = {
  id: number;
  name: string;
};

export type Activity = {
  id: number;
  activity_type: string;
  description: string;
  created_at: string;
  user: User;
};
