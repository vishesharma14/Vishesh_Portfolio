import { RouterProvider } from 'react-router/dom'
import { router } from './router.ts'

export default function App() {
  return <RouterProvider router={router} />
}
