import { create } from 'zustand';

// --- Type Definitions ---
interface Stat {
  title: string;
  value: string | number;
  icon: 'check' | 'book' | 'clock';
  link?: string; // <-- Optional link for stat cards
}

interface Roadmap {
  title: string;
  slug: string;
  progress: number;
}

interface LearningActivity {
  action: 'started' | 'completed';
  topic: string;
  topicSlug: string; // <-- Added slug for linking to the topic
  date: string;
}

interface ActivityState {
  stats: Stat[];
  roadmaps: Roadmap[];
  learningActivity: LearningActivity[];
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

// --- Create the Zustand Store ---
export const useactivityStore = create<ActivityState>((set) => ({
  // Initial state
  stats: [],
  roadmaps: [],
  learningActivity: [],
  loading: true,
  error: null,

  // The function to fetch (or re-fetch) data
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      // --- MOCK API CALL ---
      const data = await new Promise<{ stats: Stat[], roadmaps: Roadmap[], learningActivity: LearningActivity[] }>((resolve) => {
        setTimeout(() => {
          const mockStats: Stat[] = [
            { title: "Topics Completed", value: Math.floor(Math.random() * 20) + 1, icon: 'check', link: '/account/completed' },
            { title: "Topics Learning", value: Math.floor(Math.random() * 5) + 1, icon: 'book', link: '/account/learning' },
            { title: "Visit Streak", value: `${Math.floor(Math.random() * 10) + 1} days`, icon: 'clock' },
          ];
          const mockRoadmaps: Roadmap[] = [
            { title: "Frontend", slug: "frontend", progress: 75 },
            { title: "React", slug: "react", progress: 50 },
            { title: "Full Stack", slug: "full-stack", progress: 25 },
          ];
          const mockLearningActivity: LearningActivity[] = [
            { action: "started", topic: "CSS Basics", topicSlug: "css", date: "2 days ago" },
            { action: "completed", topic: "HTML Fundamentals", topicSlug: "html", date: "3 days ago" },
            { action: "started", topic: "JavaScript for Beginners", topicSlug: "javascript", date: "4 days ago" },
          ];
          resolve({ stats: mockStats, roadmaps: mockRoadmaps, learningActivity: mockLearningActivity });
        }, 500);
      });

      set({
        stats: data.stats,
        roadmaps: data.roadmaps,
        learningActivity: data.learningActivity,
        loading: false,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
    }
  },
}));