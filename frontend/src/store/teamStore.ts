import { create } from 'zustand';
import { getTeams, getTeamActivity } from '../services/teamService';
import type { Team, Activity } from '../types';

// Re-export Team for backward compatibility
export type { Team } from '../types';

type TeamState = {
  teams: Team[];
  activities: Activity[];
  selectedTeam: Team | null;
  fetchTeams: () => Promise<void>;
  fetchTeamActivity: (teamId: string) => Promise<void>;
  setSelectedTeam: (team: Team | null) => void;
};

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  activities: [],
  selectedTeam: null,
  fetchTeams: async () => {
    try {
      const teams = await getTeams();
      set({ teams });
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  },
  fetchTeamActivity: async (teamId: string) => {
    try {
      const activities = await getTeamActivity(teamId);
      set({ activities });
    } catch (error) {
      console.error("Failed to fetch team activity:", error);
    }
  },
  setSelectedTeam: (team: Team | null) => set({ selectedTeam: team }),
}));