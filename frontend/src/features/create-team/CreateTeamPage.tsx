import { useCreateTeamStore } from "@/store/createTeamStore";
import Step1_TeamDetails from "./components/Step1_TeamDetails";
import Step2_SelectSkills from "./components/Step2_SelectSkills";
import Step3_AddMembers from "./components/Step3_AddMembers";

const CreateTeamPage = () => {
  const { step, teamData, nextStep, prevStep, updateTeamData } = useCreateTeamStore();

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
