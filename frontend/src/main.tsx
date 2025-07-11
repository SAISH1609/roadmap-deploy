import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import AccountDashboard from './pages/AccountDashboard/AccountDashboard.tsx'
import ActivityView from './pages/AccountDashboard/components/ActivityView.tsx'
import Profile from './pages/AccountDashboard/components/Profile.tsx'
import TeamActivity from './pages/AccountDashboard/components/team/TeamActivity.tsx'
import TeamProgress from './pages/AccountDashboard/components/team/TeamProgress.tsx'
import TeamRoadmaps from './pages/AccountDashboard/components/team/TeamRoadmaps.tsx'
import TeamMembers from './pages/AccountDashboard/components/team/TeamMembers.tsx'
import CreateTeamPage from './pages/CreateTeamPage/CreateTeamPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'account',
        element: <AccountDashboard />,
        children: [
          {
            index: true,
            element: <ActivityView />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'team/activity',
            element: <TeamActivity />,
          },
          {
            path: 'team/progress',
            element: <TeamProgress />,
          },
          {
            path: 'team/roadmaps',
            element: <TeamRoadmaps />,
          },
          {
            path: 'team/members',
            element: <TeamMembers />,
          },
        ],
      },
      {
        path: 'teams/create',
        element: <CreateTeamPage />,
      }
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
