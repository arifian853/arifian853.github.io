import React from 'react'
import { Navbar } from '../Components/Layout/Navbar'
import { Footer } from '../Components/Layout/Footer'
import { Link } from 'react-router-dom'
import { BsArrowRightShort } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
import { Helmet } from 'react-helmet'

export const BlogPage = ({ theme, toggleTheme, articles }) => {
    return (
        <div id={theme}>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="blog-page">
                <div className="btn-bottom flex flex-row items-center justify-between">
                    <Link to='/'>
                        <button className="flex gap-1 justify-center flex-row items-center"> <FaArrowLeft /> Return </button>
                    </Link>
                </div>
            </div>
            <div className='blog-layout-container' id='light'>
                <div className="proj-title">
                    <h1 className='gradient-title p-1 titles'> Blog</h1>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Blog</title>
                    </Helmet>
                </div>
                <div className="main-blog-layout">
                    {
                        articles.length ? (
                            articles.map(article => (
                                <div className="blog-points shadow-lg" key={article.id}>
                                    <div className="title">
                                        <Link to={`/blog/${article.id}`}>
                                            <h1 className="font-bold text-1xl">{article.title}</h1>
                                        </Link>
                                        <p className='text-sm opacity-80'>{article.date_released}</p>
                                        <p className='text-sm opacity-80'>Tags : {article.tags.join(', ')}</p>
                                    </div>
                                    <p className='truncate'>{article.content}</p>

                                    <div className="btn-bottom flex flex-row items-center justify-between">
                                        <Link to={`/blog/${article.id}`}>
                                            <button className="flex gap-1 justify-center flex-row items-center"> Details <BsArrowRightShort /> </button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : <div className='no-data'>
                            <h3>There is no data, try refreshing the page</h3>
                            <span class="loader"></span>
                        </div>
                    }
                </div>
            </div>
            <Footer theme={theme} toggleTheme={toggleTheme} />
        </div>
    )
}
