import React from 'react'
import { Helmet } from "react-helmet"
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Page Not Found</title>
            </Helmet>
            <div className='not-found-page flex items-center justify-center w-full h-screen'>
                <div className="not-found">
                    <h1 className="text-2xl text-center mb-4">
                        Page Not Found
                    </h1>
                    <Link to='/'>
                        <button className='discover-btn flex justify-center items-center gap-2'> <BsArrowLeft /> Return to home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
