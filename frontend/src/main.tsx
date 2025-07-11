import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './styles/globals.css'
import App from './App.tsx'

const HomePage = lazy(() => import('./pages/HomePage.tsx'))
const AccountDashboard = lazy(() => import('./features/dashboard/AccountDashboard.tsx'))
const ActivityView = lazy(() => import('./features/dashboard/components/ActivityView.tsx'))
const Profile = lazy(() => import('./features/dashboard/components/Profile.tsx'))
const TeamActivity = lazy(() => import('./features/dashboard/components/team/TeamActivity.tsx'))
const TeamProgress = lazy(() => import('./features/dashboard/components/team/TeamProgress.tsx'))
const TeamRoadmaps = lazy(() => import('./features/dashboard/components/team/TeamRoadmaps.tsx'))
const TeamMembers = lazy(() => import('./features/dashboard/components/team/TeamMembers.tsx'))
const CreateTeamPage = lazy(() => import('./features/create-team/CreateTeamPage.tsx'))

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
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
