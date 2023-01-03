import React from 'react';
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggler = (props) => {
  const {theme, toggleTheme} = props;
  return (
    <button id={theme} className="theme-toggler" onClick={toggleTheme} checked={theme === "light"}>
        {
            theme === "dark" ? <BsMoonFill /> : <BsSunFill />
        }
    </button>
  )
}

export default ThemeToggler