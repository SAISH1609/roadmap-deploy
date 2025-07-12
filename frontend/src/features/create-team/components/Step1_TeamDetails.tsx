import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTeamStore } from "@/store/createTeamStore";
import { useState } from "react";

interface Step1Props {
  nextStep: () => void;
  updateTeamData: (data: { name: string; githubUrl: string }) => void;
}

const Step1_TeamDetails = ({ nextStep, updateTeamData }: Step1Props) => {
  const { teamData } = useCreateTeamStore();
  const [githubUrlError, setGithubUrlError] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const githubUrl = formData.get("githubUrl") as string;

    if (githubUrl && !githubUrl.startsWith("https://github.com/")) {
      setGithubUrlError("Please enter a valid GitHub organization URL (e.g., https://github.com/your-org).");
      return;
    }
    
    setGithubUrlError("");
    updateTeamData({ name, githubUrl });
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-2xl font-bold mb-6">Create a new team</h2>
      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Group Name</Label>
          <Input type="text" id="name" name="name" defaultValue={teamData.name} required />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="githubUrl">GitHub Organisation URL</Label>
          <Input type="url" id="githubUrl" name="githubUrl" defaultValue={teamData.githubUrl} />
          {githubUrlError && <p className="text-red-500 text-sm mt-1">{githubUrlError}</p>}
        </div>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Step1_TeamDetails;
