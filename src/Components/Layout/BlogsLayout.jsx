import { React } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const BlogsLayout = ({ articles }) => {
    return (
        <div className='blog-layout-container' id='light'>
            <div className="proj-title">
                <h1 className='gradient-title p-1 titles'> Blog</h1>
            </div>
            <div className="main-blog-layout">
                {
                    articles.length ? (
                        articles.slice(0, 3).map(article => (
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
                                        <button className="font-black flex gap-1 justify-center flex-row items-center"> Details <BsArrowRightShort /> </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : <div className='no-data'>
                        <h3>There is no data, try refreshing the page </h3> <span class="loader"></span>
                    </div>
                }

            </div>
            <div className="flex justify-center items-center">
                <Link to='/blog'>
                    <button className='btn-proj'>More articles <FaArrowRight /> </button>
                </Link>
            </div>
        </div>
    )
}
