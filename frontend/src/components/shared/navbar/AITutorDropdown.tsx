import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"


const AITutorDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Roadmaps</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Official Roadmaps</DropdownMenuItem>
        <DropdownMenuItem>AI Roadmaps</DropdownMenuItem>
        <DropdownMenuItem>Community Roadmaps</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AITutorDropdown