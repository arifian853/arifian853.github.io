import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './router/routes'

export const createRoot = ViteReactSSG({ routes })
