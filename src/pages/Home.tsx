import Navbar from '@/components/non_ui/Navbar'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import Greetings from '@/components/page_section/Home/Greetings';

const Home = () => {
    const { theme } = useTheme();
    const themeStyles: React.CSSProperties = {
        backgroundColor: theme.background,
        color: theme.color,
    };

    return (

        <div style={themeStyles} className='p-5'>
            <Navbar />
            <Greetings />
        </div>
    )
}

export default Home
