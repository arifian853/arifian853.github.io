import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export const Achievements = () => {
  return (
    <div className='achievement-container' id='light'>
      <div className="proj-title">
        <h1 className='gradient-title p-1 titles'> Achievements</h1>
      </div>
      <div className="main-container">
        <div className="achievement-main">

          <div className="achievement-point">
            <img src="/img/red-hat-certified-system-administrator-rhcsa.png" alt="" />
            <div className="achievement-desc">
              <h1 className='text-1xl'>RedHat Certified System Administrator (RHCSA)</h1>
              <p>Issued : 17 May 2023</p>
            </div>
          </div>

          <div className="achievement-point">
            <img src="/img/sib.png" alt="" />
            <div className="achievement-desc">
              <h1 className='text-1xl'>SIB Dicoding Kampus Merdeka - Front End & React </h1>
              <p>Issued : 31 Dec 2022</p>
            </div>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-center">
        <br />
        <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target='_blank' rel='noopener noreferrer'><button className='btn-proj'>All achievements on LinkedIn <FaArrowRight /> </button></a>
        <br />
      </div>
    </div>
  )
}
