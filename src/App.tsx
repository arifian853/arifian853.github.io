import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
