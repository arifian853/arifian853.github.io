import React from 'react';
import { SiBootstrap, SiCss3, SiHtml5, SiJavascript, SiNodedotjs, SiReact, SiTailwindcss } from 'react-icons/si'

const About = () => {
  return (
    <div className='container-about'>
        <div data-aos="fade-right" data-aos-duration="2000" className="about shadow-md">
          <div className="profile">
            <img className="profile-about" src="../images/arifian_profile.jpg" alt="" />
          </div>
          <div className="desc text-base">
            <p>Hello, my name is Arifian Saputra, an Undergraduate Informatics Engineering student that want to be a full-stack web developer soon. Welcome to my portfolio, and have a nice day.</p>
            <br />
            <hr />
            <br />
            <div className='text-3xl flex flex-wrap justify-start gap-1'>
              <SiHtml5 /> <SiCss3 /> <SiJavascript /> <SiReact /> <SiBootstrap /> <SiTailwindcss /> <SiNodedotjs />
            </div>
          </div>
        </div>
    </div>
  )
}

export default About