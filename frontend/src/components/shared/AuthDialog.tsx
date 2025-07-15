import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { login, register, getMe } from '@/services/authService';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const credentials = new URLSearchParams();
      credentials.append('username', email);
      credentials.append('password', password);
      
      const data = await login(credentials);
      setToken(data.access_token);
      
      const userData = await getMe();
      setUser(userData);

      onOpenChange(false); // Close dialog on success
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during login.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ email, password, username, full_name: fullName });
      // Automatically log in the user after successful registration
      const credentials = new URLSearchParams();
      credentials.append('username', email);
      credentials.append('password', password);
      const data = await login(credentials);
      setToken(data.access_token);
      
      const userData = await getMe();
      setUser(userData);

      onOpenChange(false); // Close dialog on success
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during registration.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
          <DialogDescription>
            {isLogin ? "Enter your credentials to access your account." : "Create a new account to get started."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit">Login</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email-reg">Email</Label>
                  <Input type="email" id="email-reg" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                 <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="username-reg">Username</Label>
                  <Input type="text" id="username-reg" placeholder="john_doe" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                 <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fullname-reg">Full Name</Label>
                  <Input type="text" id="fullname-reg" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password-reg">Password</Label>
                  <Input type="password" id="password-reg" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit">Register</Button>
              </div>
            </form>
          )}
        </div>
        <div className="text-center">
          <Button variant="link" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
