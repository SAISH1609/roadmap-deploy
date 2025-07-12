import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateTeamStore } from "@/store/createTeamStore";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  updateTeamData: (data: { roadmaps: { name: string; copyDetails: boolean }[] }) => void;
}

const availableRoadmaps = ["React", "PostgreSQL", "Javascript", "Python"];

const Step2_SelectSkills = ({ nextStep, prevStep, updateTeamData }: Step2Props) => {
  const { teamData } = useCreateTeamStore();
  const [selectedRoadmaps, setSelectedRoadmaps] = useState<string[]>(teamData.roadmaps.map(r => r.name));
  const [roadmapDetails, setRoadmapDetails] = useState<{ [key: string]: boolean }>(
    teamData.roadmaps.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.copyDetails }), {})
  );
  const [currentRoadmap, setCurrentRoadmap] = useState<string | null>(null);

  const handleSelectRoadmap = (roadmap: string) => {
    setCurrentRoadmap(roadmap);
  };

  const handleConfirmDetails = (copyDetails: boolean) => {
    if (currentRoadmap) {
      setSelectedRoadmaps((prev) => [...prev, currentRoadmap]);
      setRoadmapDetails((prev) => ({ ...prev, [currentRoadmap]: copyDetails }));
      setCurrentRoadmap(null);
    }
  };

  const handleNext = () => {
    const roadmaps = selectedRoadmaps.map(name => ({ name, copyDetails: roadmapDetails[name] }));
    updateTeamData({ roadmaps });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Skills</h2>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Pick from our roadmaps</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Roadmaps</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {availableRoadmaps.map((roadmap) => (
                <div key={roadmap} className="flex items-center justify-between">
                  <span>{roadmap}</span>
                  <Button
                    variant="secondary"
                    onClick={() => handleSelectRoadmap(roadmap)}
                    disabled={selectedRoadmaps.includes(roadmap)}
                  >
                    {selectedRoadmaps.includes(roadmap) ? "Selected" : "Select"}
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {currentRoadmap && (
        <Dialog open onOpenChange={() => setCurrentRoadmap(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Copy Node Details and Resources?</DialogTitle>
              <DialogDescription>
                This will just copy the roadmap in your team. Would you like to copy the resource links and node details as well?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => handleConfirmDetails(false)}>No</Button>
              <Button onClick={() => handleConfirmDetails(true)}>Yes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="space-y-2 my-4">
        <h3 className="font-semibold">Selected Roadmaps:</h3>
        {selectedRoadmaps.length > 0 ? (
          <ul>
            {selectedRoadmaps.map(roadmap => <li key={roadmap}>{roadmap}</li>)}
          </ul>
        ) : (
          <p>No roadmaps selected yet.</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Step2_SelectSkills;
