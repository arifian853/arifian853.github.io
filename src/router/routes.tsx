// src/routes.tsx
import { HomePage } from '@/pages/HomePage'
import type { RouteRecord } from 'vite-react-ssg'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <HomePage/>,
    entry: 'src/routes.tsx', // file entry (dibutuhkan SSG)
    children: [
    //   {
    //     index: true, // route "/"
    //     Component: HomePage,
    //   },
    ],
  },
]
