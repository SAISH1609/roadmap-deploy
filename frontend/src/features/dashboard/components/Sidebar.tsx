import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, User, Users } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useTeamStore } from "@/store/teamStore";

const Sidebar = () => {
  const [selectedTeam, setSelectedTeam] = useState("Personal");
  const { user } = useAuthStore();
  const { teams, fetchTeams, setSelectedTeam: setSelectedTeamInStore } = useTeamStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleTeamSelect = (team: typeof teams[0]) => {
    setSelectedTeam(team.name);
    setSelectedTeamInStore(team);
    navigate('/account/team/activity');
  };

  const handlePersonalSelect = () => {
    setSelectedTeam("Personal");
    setSelectedTeamInStore(null);
    navigate('/account');
  };

  const personalNavItems = [
    { href: "/account", label: "Activity" },
    { href: "/account/profile", label: "Profile" },
  ];
  const teamNavItems = [
    { href: "/account/team/activity", label: "Activity" },
    { href: "/account/team/progress", label: "Progress" },
    { href: "/account/team/roadmaps", label: "Roadmaps" },
    { href: "/account/team/members", label: "Members" },
  ];

  const navItems = selectedTeam === "Personal" ? personalNavItems : teamNavItems;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <label className="text-xs text-gray-500 dark:text-gray-400">Choose Team</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between mt-1">
              <span>{selectedTeam === "Personal" ? user?.full_name : selectedTeam}</span>
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Personal Account</DropdownMenuLabel>
            <DropdownMenuItem onSelect={handlePersonalSelect}>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.full_name}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Teams</DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem key={team.id} onSelect={() => handleTeamSelect(team)}>
                <Users className="mr-2 h-4 w-4" />
                <span>{team.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${
                  location.pathname === item.href ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;