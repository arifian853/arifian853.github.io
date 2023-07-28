import React from 'react'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <button id={theme} className="theme-toggler" onClick={toggleTheme} checked={theme === "light"}>
        {
            theme === "light" ? <BsMoonFill /> : <BsSunFill />
        }
    </button>
  )
}

export default ThemeToggler