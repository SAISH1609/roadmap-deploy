// frontend/src/components/shared/roadmaps/TopicDrawer.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { BookOpen, Video } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { TopicStatusDropdown } from "./TopicStatusDropdown";

// Define types based on your backend schemas
interface Resource {
  id: number;
  title: string;
  url: string;
  resource_type: string;
  is_free: boolean;
  description?: string;
}

interface Topic {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
}

interface TopicDrawerProps {
  topic: Topic | null;
  roadmapId: number; // Added from the second file
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ResourceType = ({ type }: { type: string }) => {
  const isVideo = type.toLowerCase() === 'video';
  return (
    <span className={`inline-flex items-center text-xs font-semibold mr-3 px-2.5 py-1 rounded-full ${isVideo ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
      {isVideo ? <Video className="h-3 w-3 mr-1.5" /> : <BookOpen className="h-3 w-3 mr-1.5" />}
      {type}
    </span>
  );
};

const ResourceList = ({ resources }: { resources: Resource[] }) => (
  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
    {resources.map((resource) => (
      <li key={resource.id}>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors"
        >
          <div className="flex items-center mb-1">
            <ResourceType type={resource.resource_type} />
            <p className="font-medium text-gray-800 dark:text-gray-200">{resource.title}</p>
          </div>
        </a>
      </li>
    ))}
  </ul>
);

const SectionLabel = ({ title, colorClasses }: { title: string, colorClasses: string }) => (
  <div className="border-b border-gray-200 dark:border-gray-700">
    <div className="inline-block px-2.5 py-1 text-sm font-semibold rounded-t-md border border-b-0 border-gray-200 dark:border-gray-700 -mb-px">
        <span className={colorClasses}>{title}</span>
    </div>
  </div>
);

export const TopicDrawer = ({ topic, roadmapId, isOpen, onOpenChange }: TopicDrawerProps) => {
  const { progress } = useProgressStore();

  if (!topic) return null;

  const currentStatus = progress[topic.id] || "not_started";
  const freeResources = topic.resources.filter(r => r.is_free);
  const premiumResources = topic.resources.filter(r => !r.is_free);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto p-0">
        <div className="p-6">
          <SheetHeader>
            <div className="flex justify-between items-start">
              <SheetTitle className="text-3xl font-bold tracking-tight pr-4 text-black dark:text-white">
                {topic.title}
              </SheetTitle>
              <TopicStatusDropdown
                roadmapId={roadmapId}
                topicId={topic.id}
                currentStatus={currentStatus}
              />
            </div>
            <SheetDescription className="text-base text-gray-600 dark:text-gray-400 pt-4">
              {topic.description || "No description available for this topic."}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 py-4">
          {freeResources.length > 0 && (
            <section className="mb-8">
              <SectionLabel title="Free Resources" colorClasses="text-green-600 dark:text-green-400" />
              <ResourceList resources={freeResources} />
            </section>
          )}

          {premiumResources.length > 0 && (
            <section>
              <SectionLabel title="Premium Resources" colorClasses="text-purple-600 dark:text-purple-400" />
              <ResourceList resources={premiumResources} />
            </section>
          )}

          {freeResources.length === 0 && premiumResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No resources available for this topic.</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};