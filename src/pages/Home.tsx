import Navbar from '@/components/non_ui/Navbar'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'

const Home = () => {
    const { theme } = useTheme();
    const themeStyles: React.CSSProperties = {
        backgroundColor: theme.background,
        color: theme.color,
    };

    return (

        <div style={themeStyles} className='p-5'>
            <Navbar />
            <div className='h-2/3 p-5'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quo debitis non! Iure esse officia, maxime quibusdam minima laboriosam deleniti possimus inventore! Eum eveniet mollitia, assumenda quo veritatis ipsum modi asperiores, error magni fuga, minima quis amet accusamus minus ad voluptatem similique iste ut nostrum officiis? Nostrum temporibus dolores nobis cumque officiis consectetur perferendis veritatis sed ipsa incidunt deleniti unde velit voluptatum sapiente tempora dicta, consequuntur nihil laboriosam et distinctio a atque quisquam eius dolorum? Maxime exercitationem eveniet, assumenda nesciunt quia, quam sit ducimus unde nihil totam aut in aliquid quasi laborum? Aut quos, ducimus ex porro recusandae odit iusto.
            </div>
        </div>
    )
}

export default Home
