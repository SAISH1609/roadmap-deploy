import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/progressStore";

interface Props {
  roadmapId: number;
  topicId: number;
  currentStatus: string;
}

export const TopicStatusDropdown = ({ roadmapId, topicId, currentStatus }: Props) => {
  const { updateTopicStatus } = useProgressStore();

  const handleStatusChange = (newStatus: string) => {
    updateTopicStatus(roadmapId, topicId, newStatus);
  };

  const statusLabels: { [key: string]: string } = {
    not_started: "Not Started",
    in_progress: "In Progress",
    done: "Done",
    skip: "Skipped",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-32">
          {statusLabels[currentStatus] || "Not Started"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange("done")}>
          Mark as Done
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("in_progress")}>
          Mark as In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("not_started")}>
          Mark as Not Started
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("skip")}>
          Skip
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};