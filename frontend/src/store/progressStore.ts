import { create } from 'zustand';
import apiClient from '../services/apiClient';

type ProgressData = {
  [topicId: number]: boolean; // topicId -> is_completed
};

type ProgressState = {
  progress: ProgressData;
  fetchProgressForRoadmap: (roadmapId: number) => Promise<void>;
  updateTopicStatus: (roadmapId: number, topicId: number, isCompleted: boolean) => Promise<void>;
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},

  // Action to fetch progress for a specific roadmap
  fetchProgressForRoadmap: async (roadmapId) => {
    try {
      const response = await apiClient.get(`/progress/${roadmapId}`);
      const newProgress = { ...get().progress };
      response.data.topic_progress.forEach((p: { topic_id: number; is_completed: boolean }) => {
        newProgress[p.topic_id] = p.is_completed;
      });
      set({ progress: newProgress });
    } catch (error) {
      console.error("Failed to fetch progress for roadmap:", error);
      // Initialize progress for this roadmap if it fails (e.g., user's first time)
      const { data } = await apiClient.get(`/roadmaps/${roadmapId}`);
      const initialProgress = { ...get().progress };
      data.topics.forEach((topic: { id: number }) => {
        if (initialProgress[topic.id] === undefined) {
          initialProgress[topic.id] = false;
        }
      });
      set({ progress: initialProgress });
    }
  },

  // Action to update a topic's status on the frontend and backend
  updateTopicStatus: async (roadmapId, topicId, isCompleted) => {
    // Optimistically update the UI
    set((state) => ({
      progress: {
        ...state.progress,
        [topicId]: isCompleted,
      },
    }));

    // Persist the change to the backend
    try {
      await apiClient.post(`/progress/${roadmapId}/topics/${topicId}`, {
        topic_id: topicId,
        is_completed: isCompleted,
      });
    } catch (error) {
      console.error("Failed to update topic status:", error);
      // Revert the state if the API call fails
      set((state) => ({
        progress: {
          ...state.progress,
          [topicId]: !isCompleted,
        },
      }));
    }
  },
}));