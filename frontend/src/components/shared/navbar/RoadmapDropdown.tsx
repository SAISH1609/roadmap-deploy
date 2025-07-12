// components/shared/Navbar/RoadmapDropdown.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function RoadmapDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">AI tutor</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Create with AI</DropdownMenuItem>
        <DropdownMenuItem>Ask AI Tutor</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
