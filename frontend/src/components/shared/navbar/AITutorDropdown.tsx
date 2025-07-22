import { useNavigate } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function AITutorDropdown() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">AI Tutor</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate("/ai-tutor")}>Ask AI Tutor</DropdownMenuItem>
        <DropdownMenuItem>Create with AI</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
