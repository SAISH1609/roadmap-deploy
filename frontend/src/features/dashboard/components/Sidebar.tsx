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

  // fallback name if none found
  const currentUserName =
    user?.full_name || user?.name || user?.username || "User";

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleTeamSelect = (team: typeof teams[0]) => {
    setSelectedTeam(team.name);
    setSelectedTeamInStore(team);
    navigate("/account/team/activity");
  };

  const handlePersonalSelect = () => {
    setSelectedTeam("Personal");
    setSelectedTeamInStore(null);
    navigate("/account");
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
        <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
          Choose Team
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between mt-2 h-12 bg-blue-800 border-blue-700 text-white hover:bg-blue-700 hover:text-white"
            >
              <span className="font-medium text-white">
                {selectedTeam === "Personal" ? currentUserName : selectedTeam}
              </span>
              <ChevronsUpDown className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Personal Account</DropdownMenuLabel>
            <DropdownMenuItem onSelect={handlePersonalSelect}>
              <User className="mr-2 h-4 w-4" />
              <span>{currentUserName}</span>
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
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center p-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
