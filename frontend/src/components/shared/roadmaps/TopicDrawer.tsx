// frontend/src/components/shared/roadmaps/TopicDrawer.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TopicStatusDropdown } from "./TopicStatusDropdown"; // Import the dropdown
import { useProgressStore } from "@/store/progressStore";   // Import the store

// ... (Resource interfaces and components) ...

interface TopicDrawerProps {
topic: any | null;
roadmapId: number; // Receive roadmapId
isOpen: boolean;
onOpenChange: (isOpen: boolean) => void;
}

export const TopicDrawer = ({ topic, roadmapId, isOpen, onOpenChange }: TopicDrawerProps) => {
const { progress } = useProgressStore();

if (!topic) return null;

const isCompleted = progress[topic.id] || false;

// ... (Resource filtering logic) ...

return (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetContent className="w-full sm:max-w-lg ...">
      <div className="p-6">
          <SheetHeader>
            <div className="flex justify-between items-start">
              <SheetTitle className="text-3xl font-bold tracking-tight text-black dark:text-white pr-4">
                {topic.title}
              </SheetTitle>
              {/* Add the dropdown here */}
              <TopicStatusDropdown
                roadmapId={roadmapId}
                topicId={topic.id}
                isCompleted={isCompleted}
              />
            </div>
            <SheetDescription className="text-base ... pt-4">
              {topic.description || "No description available for this topic."}
            </SheetDescription>
          </SheetHeader>
      </div>
      {/* ... (Rest of the component for displaying resources) ... */}
    </SheetContent>
  </Sheet>
);
};