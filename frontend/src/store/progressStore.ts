import { create } from 'zustand';
import apiClient from '../services/apiClient';

type ProgressData = {
  [topicId: number]: string; // topicId -> status
};

type ProgressState = {
  progress: ProgressData;
  fetchProgressForRoadmap: (roadmapId: number) => Promise<void>;
  updateTopicStatus: (roadmapId: number, topicId: number, status: string) => Promise<void>;
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},

  // Action to fetch progress for a specific roadmap
  fetchProgressForRoadmap: async (roadmapId) => {
    try {
      const response = await apiClient.get(`/progress/${roadmapId}`);
      const newProgress = { ...get().progress };
      response.data.topic_progress.forEach((p: { topic_id: number; status: string }) => {
        newProgress[p.topic_id] = p.status;
      });
      set({ progress: newProgress });
    } catch (error) {
      console.error("Failed to fetch progress for roadmap:", error);
      // Initialize progress for this roadmap if it fails (e.g., user's first time)
      const { data } = await apiClient.get(`/roadmaps/${roadmapId}`);
      const initialProgress = { ...get().progress };
      data.topics.forEach((topic: { id: number }) => {
        if (initialProgress[topic.id] === undefined) {
          initialProgress[topic.id] = "not_started";
        }
      });
      set({ progress: initialProgress });
    }
  },

  // Action to update a topic's status on the frontend and backend
  updateTopicStatus: async (roadmapId, topicId, status) => {
    const oldStatus = get().progress[topicId] || "not_started";
    // Optimistically update the UI
    set((state) => ({
      progress: {
        ...state.progress,
        [topicId]: status,
      },
    }));

    // Persist the change to the backend
    try {
      await apiClient.post(`/progress/${roadmapId}/topics/${topicId}`, {
        topic_id: topicId,
        status: status,
      });
    } catch (error) {
      console.error("Failed to update topic status:", error);
      // Revert the state if the API call fails
      set((state) => ({
        progress: {
          ...state.progress,
          [topicId]: oldStatus,
        },
      }));
    }
  },
}));