import { useEffect, useState } from 'react';
import { useTeamStore } from '@/store/teamStore';
import { useAuthStore } from '@/store/authStore';
import { 
  getTeamMembers, 
  inviteTeamMember, 
  leaveTeam, 
  removeTeamMember,
  getPendingInvitations,
  resendInvitation,
  cancelInvitation
} from '@/services/teamService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const TeamMembers = () => {
  const { selectedTeam, setSelectedTeam } = useTeamStore();
  const { user } = useAuthStore();
  
  const [members, setMembers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    if (selectedTeam) {
      try {
        const teamMembers = await getTeamMembers(selectedTeam.id.toString());
        setMembers(teamMembers);
        
        const currentUserMember = teamMembers.find((m: any) => m.id === user?.id);
        if (currentUserMember?.role === 'admin') {
          setIsAdmin(true);
          const pendingInvites = await getPendingInvitations(selectedTeam.id.toString());
          setInvitations(pendingInvites);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTeam, user]);

  const handleInvite = async () => {
    if (selectedTeam && inviteEmail) {
      setIsLoading(true);
      setInviteError(null);
      setInviteSuccess(null);
      try {
        const response = await inviteTeamMember(selectedTeam.id.toString(), inviteEmail);
        setInviteSuccess(response.message || 'Invitation sent successfully!');
        setInviteEmail('');
        fetchData(); // Refresh invitations
        setTimeout(() => {
          setIsInviteDialogOpen(false);
          setInviteSuccess(null);
        }, 2000);
      } catch (error: any) {
        setInviteError(error.response?.data?.detail || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = async (invitationId: number) => {
    if (selectedTeam) {
      try {
        await resendInvitation(selectedTeam.id.toString(), invitationId);
        alert('Invitation resent!');
      } catch (error) {
        alert('Failed to resend invitation.');
        console.error(error);
      }
    }
  };

  const handleCancel = async (invitationId: number) => {
    if (selectedTeam && window.confirm("Are you sure you want to cancel this invitation?")) {
      try {
        await cancelInvitation(selectedTeam.id.toString(), invitationId);
        fetchData(); // Refresh invitations
      } catch (error) {
        alert('Failed to cancel invitation.');
        console.error(error);
      }
    }
  };

  const handleLeaveTeam = async () => {
    if (selectedTeam && window.confirm("Are you sure you want to leave this team?")) {
      try {
        await leaveTeam(selectedTeam.id.toString());
        setSelectedTeam(null);
      } catch (error) {
        alert("Failed to leave the team.");
      }
    }
  };

  const handleRemoveMember = async (userId: number) => {
    if (selectedTeam && window.confirm("Are you sure you want to remove this member?")) {
      try {
        await removeTeamMember(selectedTeam.id.toString(), userId);
        fetchData();
      } catch (error) {
        alert("Failed to remove the member.");
      }
    }
  };

  if (!selectedTeam) return <div>Please select a team to see its members.</div>;

  return (
    <div className="space-y-6">
      <Card className="text-gray-900 dark:text-gray-100">
        <CardHeader >
          <div className="flex justify-between items-center">
            <CardTitle >{selectedTeam.name}</CardTitle>
            <Button variant="destructive" onClick={handleLeaveTeam}>Leave Team</Button>
          </div>
          <CardDescription>{members.length} people in this team.</CardDescription>
        </CardHeader>
        <CardContent >
          <div className="space-y-4">
            {members.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar><AvatarImage src={member.profile_picture} /><AvatarFallback>{member.username.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-semibold">{member.full_name || member.username}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 capitalize">{member.role}</span>
                  {isAdmin && user?.id !== member.id && (
                    <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id)}>Remove</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isAdmin && (
        <Card className="text-gray-900 dark:text-gray-100">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pending Invitations</CardTitle>
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild><Button>+ Invite Member</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Invite a New Member</DialogTitle></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="user@example.com" />
                  </div>
                  {inviteError && <p className="text-red-500 text-sm text-center">{inviteError}</p>}
                  {inviteSuccess && <p className="text-green-500 text-sm text-center">{inviteSuccess}</p>}
                  <Button onClick={handleInvite} disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Invitation'}</Button>
                </DialogContent>
              </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitations.length > 0 ? invitations.map((invite: any) => (
              <div key={invite.id} className="flex items-center justify-between">
                <p className="text-sm font-medium">{invite.email}</p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleResend(invite.id)}>Resend</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleCancel(invite.id)}>Cancel</Button>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No pending invitations.</p>
            )}
          </div>
        </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamMembers;