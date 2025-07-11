import { useState } from "react";
import Step1_TeamDetails from "./components/Step1_TeamDetails";
import Step2_SelectSkills from "./components/Step2_SelectSkills";
import Step3_AddMembers from "./components/Step3_AddMembers";

const CreateTeamPage = () => {
  const [step, setStep] = useState(1);
  const [teamData, setTeamData] = useState({
    name: "",
    githubUrl: "",
    roadmaps: [] as { name: string; copyDetails: boolean; }[],
    members: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateTeamData = (data: Partial<typeof teamData>) => {
    setTeamData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {step === 1 && (
        <Step1_TeamDetails nextStep={nextStep} updateTeamData={updateTeamData} />
      )}
      {step === 2 && (
        <Step2_SelectSkills nextStep={nextStep} prevStep={prevStep} updateTeamData={updateTeamData} />
      )}
      {step === 3 && (
        <Step3_AddMembers prevStep={prevStep} teamData={teamData} />
      )}
    </div>
  );
};

export default CreateTeamPage;
