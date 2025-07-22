import { create } from 'zustand';
import apiClient from '../services/apiClient';
import { formatDistanceToNow } from 'date-fns';

// --- Type Definitions for what the backend returns ---
interface BackendActivityStats {
  topics_completed: number;
  currently_learning: number;
  visit_streak: number;
}

interface BackendRoadmapProgress {
  roadmap_title: string;
  roadmap_slug: string;
  progress_percentage: number;
}

interface BackendLearningActivity {
  action: 'started' | 'completed' | 'done' | 'in_progress' | 'skip';
  topic_title: string;
  roadmap_slug: string;
  timestamp: string;
}

interface BackendActivityDashboard {
  stats: BackendActivityStats;
  continue_following: BackendRoadmapProgress[];
  learning_activity: BackendLearningActivity[];
}


// --- Type Definitions for what the frontend components expect ---
interface Stat {
  title: string;
  value: string | number;
  icon: 'check' | 'book' | 'clock';
  link?: string;
}

interface Roadmap {
  title: string;
  slug: string;
  progress: number;
}

interface LearningActivity {
  action: 'started' | 'completed';
  topic: string;
  topicSlug: string;
  date: string;
  // Add a unique key for React rendering
  id: string;
}

// Add a type for the filter
type ActivityFilter = 'all' | 'started' | 'completed';

interface ActivityState {
  stats: Stat[];
  roadmaps: Roadmap[];
  learningActivity: LearningActivity[];
  loading: boolean;
  error: string | null;
  activityFilter: ActivityFilter; // <-- Add filter state
  fetchDashboardData: () => Promise<void>;
  setActivityFilter: (filter: ActivityFilter) => void; // <-- Add action to set filter
}

// --- Helper function to format date ---
const formatRelativeDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return "a long time ago";
  }
};

// --- Create the Zustand Store ---
export const useactivityStore = create<ActivityState>((set) => ({
  // Initial state
  stats: [],
  roadmaps: [],
  learningActivity: [],
  loading: true,
  error: null,
  activityFilter: 'all', // <-- Default filter

  // Action to set the filter
  setActivityFilter: (filter: ActivityFilter) => set({ activityFilter: filter }),

  // The function to fetch data from the backend
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get<BackendActivityDashboard>('/activity/dashboard');
      const data = response.data;

      // --- Transform backend data to frontend format ---
      const transformedStats: Stat[] = [
        {
          title: "Topics Completed",
          value: data.stats.topics_completed,
          icon: 'check',
          link: '/account/completed'
        },
        {
          title: "Topics Learning",
          value: data.stats.currently_learning,
          icon: 'book',
          link: '/account/learning'
        },
        {
          title: "Visit Streak",
          value: `${data.stats.visit_streak} days`,
          icon: 'clock'
        },
      ];

      const transformedRoadmaps: Roadmap[] = data.continue_following.map(r => ({
        title: r.roadmap_title,
        slug: r.roadmap_slug,
        progress: r.progress_percentage,
      }));

      const transformedLearningActivity: LearningActivity[] = data.learning_activity.map((a, index) => ({
        id: `${a.timestamp}-${index}`, // Create a unique ID
        action: a.action === 'done' || a.action === 'completed' ? 'completed' : 'started',
        topic: a.topic_title,
        topicSlug: a.roadmap_slug,
        date: formatRelativeDate(a.timestamp),
      }));

      set({
        stats: transformedStats,
        roadmaps: transformedRoadmaps,
        learningActivity: transformedLearningActivity,
        loading: false,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
    }
  },
}));
