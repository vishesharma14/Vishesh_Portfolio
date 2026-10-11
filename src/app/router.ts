import { createBrowserRouter } from 'react-router'
import { PublicLayout } from '../components/layout/PublicLayout.tsx'
import { HomePage } from '../pages/HomePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { ProjectPage } from '../pages/ProjectPage.tsx'
import { RootLayout } from './RootLayout.tsx'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    // Blank page shown only while a lazy route (e.g. /admin) loads on a first visit.
    HydrateFallback: () => null,
    children: [
      {
        Component: PublicLayout,
        children: [
          { index: true, Component: HomePage },
          { path: 'projects/:slug', Component: ProjectPage },
          { path: '*', Component: NotFoundPage },
        ],
      },
      {
        // Lazy-loaded so the admin code is a separate bundle that visitors never download.
        path: 'admin/*',
        lazy: async () => {
          const { AdminPlaceholderPage } = await import('../admin/AdminPlaceholderPage.tsx')
          return { Component: AdminPlaceholderPage }
        },
      },
    ],
  },
])
