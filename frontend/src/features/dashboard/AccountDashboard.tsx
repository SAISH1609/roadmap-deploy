import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

const AccountDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountDashboard;

