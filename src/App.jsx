/*Utility and standard library*/
import { React, useState, createContext, useEffect } from 'react'
import { BsSunFill, BsMoonFill } from "react-icons/bs"
import toast, { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

/*Imported Components*/
import { ScrollToTop } from './Components/NonLayout/ScrollToTop' /*Non - Layout*/

/*Pages Component*/
import { Home } from './Pages/Home'
import { NotFound } from './Pages/NotFound'
import { BlogPage } from './Pages/BlogPage' 
import { BlogItems } from './Pages/BlogItems'

/*Theme context export*/ 
export const ThemeContext = createContext(null);

function App() {
  useEffect(() => {
    AOS.init();
  })


  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }

  }, []);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (theme === "light") {
      toast.success('Theme changed to Dark', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#14384E',
          color: '#F7F7F7',
          border: '1px solid #F7F7F7',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '14px',
        },
        className: 'shadow-md',
        icon: <BsMoonFill />
      });

    } if (theme === "dark") {
      toast.success('Theme changed to Light', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#F7F7F7',
          color: '#14384E',
          border: '1px solid #14384E',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '14px',
        },
        className: 'shadow-md',
        icon: <BsSunFill />
      });
    }
  }

  const [articles, setArticles] = useState([]);

  useEffect(() => {
     const fetchData = async () => {
        const response = await axios.get("https://personal-api.cyclic.app/api/articles");
        setArticles(response.data);
    };
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/*Non-layout components*/}
      <section>
        <Toaster />
        <ScrollToTop />
      </section>

      {/*Main routes components*/}
      <Routes>
        <Route path='/' exact element={<Home theme={theme} toggleTheme={toggleTheme} articles={articles} />} />
        <Route path='/blog' element={<BlogPage theme={theme} toggleTheme={toggleTheme} articles={articles} />} />
        <Route path='/blog/:id' element={<BlogItems theme={theme} toggleTheme={toggleTheme} articles={articles} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App        