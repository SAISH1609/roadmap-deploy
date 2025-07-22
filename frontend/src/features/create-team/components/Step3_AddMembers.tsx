import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useCreateTeamStore } from "@/store/createTeamStore";
import { createTeam } from "@/services/teamService";
import { useNavigate } from "react-router-dom";

interface Step3Props {
  prevStep: () => void;
  teamData: {
    name: string;
    githubUrl: string;
    roadmap_ids: number[];
    members: string[];
  };
}

const Step3_AddMembers = ({ prevStep }: Step3Props) => {
  const { teamData, updateTeamData } = useCreateTeamStore();
  const [emails, setEmails] = useState<string[]>(teamData.members);
  const [currentEmail, setCurrentEmail] = useState("");
  const navigate = useNavigate();

  const handleAddEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      const newEmails = [...emails, currentEmail];
      setEmails(newEmails);
      updateTeamData({ members: newEmails });
      setCurrentEmail("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    const newEmails = emails.filter((email) => email !== emailToRemove);
    setEmails(newEmails);
    updateTeamData({ members: newEmails });
  };

  const handleFinish = async () => {
    try {
      const newTeam = await createTeam({
        name: teamData.name,
        description: teamData.githubUrl,
        roadmap_ids: teamData.roadmap_ids,
        members: emails,
      });
      alert(`Team "${newTeam.name}" created successfully!`);
      useCreateTeamStore.getState().reset();
      navigate(`/account/team/roadmaps`);
    } catch (error) {
      console.error("Failed to create team:", error);
      alert("Failed to create team. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Members</h2>
      <div className="mb-6">
        <Label htmlFor="email">Member Email</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="email"
            id="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="member@example.com"
          />
          <Button type="button" onClick={handleAddEmail}>
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2 my-4">
        <h3 className="font-semibold">Members to invite:</h3>
        {emails.length > 0 ? (
          <ul className="space-y-2">
            {emails.map((email) => (
              <li
                key={email}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
              >
                <span>{email}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveEmail(email)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members added yet.</p>
        )}
      </div>

      <div className="mt-8 p-4 border rounded">
        <h3 className="font-bold text-lg mb-2">Team Summary</h3>
        <p>
          <strong>Name:</strong> {teamData.name}
        </p>
        <p>
          <strong>GitHub:</strong> {teamData.githubUrl}
        </p>
        <p>
          <strong>Roadmaps:</strong> {teamData.roadmap_ids.join(", ")}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={handleFinish}>Finish & Send Invites</Button>
      </div>
    </div>
  );
};

export default Step3_AddMembers;