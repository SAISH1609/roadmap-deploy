import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateTeamStore } from "@/store/createTeamStore";
import { getRoadmaps } from "@/services/roadmapService";
import type { RoadmapSummary } from "@/types";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  updateTeamData: (data: { roadmap_ids: number[] }) => void;
}

const Step2_SelectRoadmaps = ({ nextStep, prevStep, updateTeamData }: Step2Props) => {
  const { teamData } = useCreateTeamStore();
  const [availableRoadmaps, setAvailableRoadmaps] = useState<RoadmapSummary[]>([]);
  const [selectedRoadmapIds, setSelectedRoadmapIds] = useState<number[]>(teamData.roadmap_ids);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const roadmaps = await getRoadmaps();
        setAvailableRoadmaps(roadmaps);
      } catch (error) {
        console.error("Failed to fetch roadmaps", error);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleToggleRoadmap = (roadmapId: number) => {
    setSelectedRoadmapIds((prev) =>
      prev.includes(roadmapId)
        ? prev.filter((id) => id !== roadmapId)
        : [...prev, roadmapId]
    );
  };

  const handleNext = () => {
    updateTeamData({ roadmap_ids: selectedRoadmapIds });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Roadmaps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableRoadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            onClick={() => handleToggleRoadmap(roadmap.id)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedRoadmapIds.includes(roadmap.id) ? "border-primary" : ""
            }`}
          >
            <h3 className="font-semibold">{roadmap.title}</h3>
            <p className="text-sm text-muted-foreground">{roadmap.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Step2_SelectRoadmaps;