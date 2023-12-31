import React from 'react'
import ThemeToggler from '../NonLayout/ThemeToggler'

export const Footer = ({ toggleTheme, theme }) => {
  
  return (
    <footer className='flex justify-center items-center gap-2'>
       Copyright © Arifian Saputra, {new Date().getFullYear()}. All rights reserved | <ThemeToggler toggleTheme={toggleTheme} theme={theme}/>
    </footer>
  )
}
