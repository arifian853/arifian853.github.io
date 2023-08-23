import { React } from 'react'

export const LandingPage = () => {
    return (
        <div className='landing-page-container' id='light'>
            <div data-aos="fade-right" data-aos-duration="2000" className="left-side">
                <div className="greeting">
                    <h1 className='font-bold text-1xl tracking-wider'>Hello! I'm Arifian Saputra</h1>
                    <br />
                    <p className='tracking-wider'>Hail and well met, visitors, to this humble portfolio of mine own! Arifian, a Web Developer of this very realm gonna say : "May you satisfied with the content!"</p>
                    <br />
                    <a href="#about"><button className='discover-btn'>Discover</button></a>
                </div>
            </div>
            <div className="right-side">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
            </div>
        </div>
    )
}
