import React from 'react'
import ThemeToggler from '../NonLayout/ThemeToggler'

export const Footer = ({ toggleTheme, theme }) => {
  return (
    <footer className='flex justify-center items-center gap-2'>
        Designed and Coded by Arifian Saputra with React + Vite | Copyright © Arifian Saputra, 2023. All rights reserved | <ThemeToggler toggleTheme={toggleTheme} theme={theme}/>
    </footer>
  )
}
