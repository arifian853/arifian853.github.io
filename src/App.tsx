import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { NotFound } from '@/pages/NotFound'
import { Footer } from '@/components/layout/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    AOS.init();
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-auto pt-1 pb-1">
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='*' element={<NotFound />} />

          <Route path='/about' element={<About />} />

        </Routes>
        <Footer />
      </div>

    </ThemeProvider>

  )
}

export default App
