import { create } from 'zustand';

type TeamData = {
  name: string;
  githubUrl: string;
  roadmap_ids: number[];
  members: string[];
};

type CreateTeamState = {
  step: number;
  teamData: TeamData;
  nextStep: () => void;
  prevStep: () => void;
  updateTeamData: (data: Partial<TeamData>) => void;
  reset: () => void;
};

const initialState: Omit<CreateTeamState, 'nextStep' | 'prevStep' | 'updateTeamData' | 'reset'> = {
  step: 1,
  teamData: {
    name: '',
    githubUrl: '',
    roadmap_ids: [],
    members: [],
  },
};

export const useCreateTeamStore = create<CreateTeamState>((set) => ({
  ...initialState,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateTeamData: (data) => set((state) => ({ teamData: { ...state.teamData, ...data } })),
  reset: () => set(initialState),
}));
