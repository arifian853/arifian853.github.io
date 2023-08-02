import { React, useState, useEffect } from 'react'
import { Navbar } from '../Components/Layout/Navbar'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
// import { BsArrowRightShort } from 'react-icons/bs'

export const BlogItems = ({ theme, toggleTheme, articles }) => {
    let { id } = useParams()
    const [loading, setLoading] = useState(true);
    const article = articles.filter((item) => {
        return item.id === id;
    })

    useEffect(() => {
        setLoading(true);
        fetch(`https://personal-api.cyclic.app/api/articles/${id}`)
            .then((response) => response.json())
            .then((article) => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className='no-data-full'>
                    <h3 className='text-3xl'>Loading</h3> <span class="loader"></span> 
                </div>;
    }

    const { title, date_released, content, author, tags } = article[0]

    return (
        <div id={theme}>
            <>
                <Navbar theme={theme} toggleTheme={toggleTheme} />
            </>
            <div className='main-article p-10 flex flex-col gap-3' key={id}>
                <div className="btn-bottom flex flex-row items-center justify-between">
                    <Link to='/blog'>
                        <button className="flex gap-1 justify-center flex-row items-center"> <FaArrowLeft /> Return </button>
                    </Link>
                </div>
                <br />
                <h1 className='text-3xl blog-title'>{title}</h1>
                <p className='opacity-80 text-sm'>Author : {author}</p>
                <p className='opacity-80 text-sm'> {date_released}</p> 
                <hr className='hr-bold' />
                {content} <br />

                <p className='opacity-80 text-sm'>Tags : {tags.join(', ')} <br /> </p>
            </div>
        </div>
    )
}
