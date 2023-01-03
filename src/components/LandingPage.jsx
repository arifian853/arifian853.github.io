import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <div className="container-landing-page" id='light'>
        <div className="left-side">
          <h1 className="text-3xl">Hello !</h1>
          <p> My name is Arifian Saputra, an Undergraduate Informatics Engineering student that has interest in full-stack web development. Welcome !</p>
        </div>
        <div className="right-side">
          <a className='btn-discover-a' href="#about"><button className='btn-discover shadow-md'>Discover</button></a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage