import { create } from 'zustand';
import { getTeams, getTeamActivity } from '../services/teamService';

export type Team = {
  id: number;
  name: string;
};

type User = {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
};

type Activity = {
  id: number;
  activity_type: string;
  description: string;
  created_at: string;
  user: User;
};

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