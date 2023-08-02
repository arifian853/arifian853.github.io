import React from 'react'

/*Imported Layout components */
import { Navbar } from '../Components/Layout/Navbar'
import { LandingPage } from '../Components/Layout/LandingPage'
import { About } from '../Components/Layout/About'
import { Projects } from '../Components/Layout/Projects'
import { Achievements } from '../Components/Layout/Achievements'
import { BlogsLayout } from '../Components/Layout/BlogsLayout'
import { Contact } from '../Components/Layout/Contact'
import { Footer } from '../Components/Layout/Footer'
import { Helmet } from 'react-helmet'

export const Home = ({ theme, toggleTheme, articles }) => {
  return (
    <div id={theme}>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Arifian Saputra - Home</title>
        </Helmet>
        {/*Layout components */}

        <section id={theme}>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
        </section>

        <section id='landing-page'>
          <LandingPage />
        </section>

        <section id='about'>
          <About />
        </section>

        <section id='projects'>
          <Projects />
        </section>

        <section id='achievements'>
          <Achievements />
        </section>

        <section id='blog'>
          <BlogsLayout articles={articles} />
        </section>

        <section id='contacts'>
          <Contact />
        </section>

        <section id='footer'>
          <Footer toggleTheme={toggleTheme} theme={theme} />
        </section>
      </>
    </div>
  )
}
