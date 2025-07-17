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
  isCompleted: boolean;
}

export const TopicStatusDropdown = ({ roadmapId, topicId, isCompleted }: Props) => {
  const { updateTopicStatus } = useProgressStore();

  const handleStatusChange = () => {
    updateTopicStatus(roadmapId, topicId, !isCompleted);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-32">
          {isCompleted ? "Completed" : "Pending"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleStatusChange}>
          Mark as {isCompleted ? "Pending" : "Completed"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};