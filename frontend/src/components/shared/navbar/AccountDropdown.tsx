// components/shared/Navbar/AccountDropdown.tsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { Link } from "react-router"
  import { PlusCircle, Users } from "lucide-react"
  
  export default function AccountDropdown() {
    const teams = ["Team A", "Team B"]; // Placeholder
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-purple-600 text-white rounded-full">Account / Teams</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/account">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/profile">My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              <span>Teams</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {teams.map(team => (
                <DropdownMenuItem key={team}>{team}</DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/teams/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create new team
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  