import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/shared/navbar/Navbar';
import Footer from './components/ui/Footer';
import { useAuthStore } from './store/authStore';
import { getMe } from './services/authService';

const App = () => {
  const { token } = useAuthStore();

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          // Token is loaded from localStorage by zustand middleware,
          // now we just need to fetch user's info
          await getMe();
        } catch (error) {
          console.error("Session expired or token is invalid. Logging out.");
          // If token is invalid (e.g., expired), logout the user
          useAuthStore.getState().logout();
        }
      }
    };
    checkUser();
  }, [token]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;