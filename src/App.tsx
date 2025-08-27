import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home/Home'
import { About } from '@/pages/About/About'
import { NotFound } from '@/pages/NotFound/NotFound'
import { Footer } from '@/components/layout/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import { ProjectPage } from './pages/Project/ProjectPage'
import { Chat } from './pages/Chat/Chat'
import { Projects } from './pages/Project/Projects'
import ScrollToTop from './components/scroll-to-top'
import ScrollToTopButton from './components/scroll-btn'
import { Write } from './pages/Write/Write'
import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    AOS.init();
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-[#E0E0E0] dark:bg-[#121212] h-auto pt-1 pb-1">
        <ScrollToTop />
        <ScrollToTopButton />
        <Analytics />
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='*' element={<NotFound />} />

          <Route path='/about' element={<About />} />

          <Route path='/project' element={<Projects />} />

          <Route path='/project/:id' element={<ProjectPage />} />

          <Route path='/chat-ai' element={<Chat />} />

          <Route path='/write' element={<Write />} />

        </Routes>
        <Footer />
      </div>

    </ThemeProvider>

  )
}

export default App
