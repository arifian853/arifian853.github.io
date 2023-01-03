import { React, createContext, useState } from 'react';
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import './App.css';
import SkipToMain from './components/SkipToMain';
import Navbar from './components/Navbar';
import { Particle } from './components/Particle';
import { ScrollToTop } from './components/ScrollToTop';
import toast, { Toaster } from 'react-hot-toast';
import ThemeToggler from './components/ThemeToggler';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    if(theme === "light") {
      toast.success('Theme changed to Dark', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#222831',
          color: '#ECECEC',
          border : '1px solid #ECECEC'
        },
        className: 'shadow-md',
        icon : <BsMoonFill />
      });
    } if(theme === "dark") {
      toast.success('Theme changed to Light', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#ECECEC',
          color: '#222831',
          border : '1px solid #222831'
        },
        className: 'shadow-md',
        icon : <BsSunFill />
      });
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <>
      <section id="outsider">
        <SkipToMain />
        <Navbar />
        <Particle theme={theme}/>  
        <ScrollToTop />
        <Toaster />
        <ThemeToggler toggleTheme={toggleTheme} theme={theme} />
      </section>
      <main>
        <section id="landing-page">
          <div id={theme}>
            <LandingPage />
          </div>
        </section>
        <section id="about">
          <div id={theme}>
            <About />
          </div>
        </section>
        <section id="projects">
          <div id={theme}>
            <Projects />
          </div>
        </section>
        <section id="achievement">
          <div id={theme}>
            <Achievements />
          </div>
        </section>
        <section id="contacts">
          <div id={theme}>
            <Contacts />
          </div>
        </section>
      </main>
      <Footer />
    </>
    </ThemeContext.Provider>
  );
}

export default App;
