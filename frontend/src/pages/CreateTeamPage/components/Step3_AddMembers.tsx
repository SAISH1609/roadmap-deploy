import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Step3Props {
  prevStep: () => void;
  teamData: {
    name: string;
    githubUrl: string;
    roadmaps: { name: string; copyDetails: boolean }[];
  };
}

const Step3_AddMembers = ({ prevStep, teamData }: Step3Props) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");

  const handleAddEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail]);
      setCurrentEmail("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleFinish = () => {
    // In a real app, you'd send the invites and create the team here.
    alert("Team created and invites sent (not really)!");
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
          <Button type="button" onClick={handleAddEmail}>Add</Button>
        </div>
      </div>

      <div className="space-y-2 my-4">
        <h3 className="font-semibold">Members to invite:</h3>
        {emails.length > 0 ? (
          <ul className="space-y-2">
            {emails.map(email => (
              <li key={email} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <span>{email}</span>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveEmail(email)}>
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
        <p><strong>Name:</strong> {teamData.name}</p>
        <p><strong>GitHub:</strong> {teamData.githubUrl}</p>
        <p><strong>Roadmaps:</strong> {teamData.roadmaps.map(r => r.name).join(', ')}</p>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button onClick={handleFinish}>Finish & Send Invites</Button>
      </div>
    </div>
  );
};

export default Step3_AddMembers;
