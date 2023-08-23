import React from 'react'
import { IoLogoHtml5, IoLogoCss3, IoLogoSass, IoLogoWordpress, IoLogoNodejs } from 'react-icons/io'
import { SiBootstrap, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiLinux, SiFlutter } from 'react-icons/si'
import { FaReact } from 'react-icons/fa'

export const About = () => {

  const stacksData = [
    {
      id: "1234567890",
      name: "HTML",
      icon: <IoLogoHtml5 />,
    },
    {
      id: "9876543210",
      name: "CSS",
      icon: <IoLogoCss3 />,
    },
    {
      id: "0123456789",
      name: "JavaScript",
      icon: <SiJavascript />,
    },
    {
      id: "8765432109",
      name: "React",
      icon: <FaReact />,
    },
    {
      id: "7654321098",
      name: "SASS/SCSS",
      icon: <IoLogoSass />,
    },
    {
      id: "6543210987",
      name: "Bootstrap",
      icon: <SiBootstrap />,
    },
    {
      id: "5432109876",
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
    },
    {
      id: "4321098765",
      name: "WordPress",
      icon: <IoLogoWordpress />,
    },
    {
      id: "3210987654",
      name: "Node JS",
      icon: <IoLogoNodejs />,
    },
    {
      id: "2109876543",
      name: "Express JS",
      icon: <SiExpress />,
    },
    {
      id: "1098765432",
      name: "MongoDB",
      icon: <SiMongodb />,
    },
    {
      id: "0987654321",
      name: "Linux",
      icon: <SiLinux />,
    },
    {
      id: "9876543210",
      name: "Flutter",
      icon: <SiFlutter />,
    }

  ];

  const expData = [
    {
      id: "1234567890",
      name: "4 Years",
      icon: <IoLogoHtml5 />,
    },
    {
      id: "9876543210",
      name: "4 Years",
      icon: <IoLogoCss3 />,
    },
    {
      id: "0123456789",
      name: "1.5 Years",
      icon: <SiJavascript />,
    },
    {
      id: "8765432109",
      name: "1.5 Years",
      icon: <FaReact />,
    },
    {
      id: "7654321098",
      name: "6 Months+",
      icon: <IoLogoSass />,
    },
    {
      id: "6543210987",
      name: "3 Years",
      icon: <SiBootstrap />,
    },
    {
      id: "5432109876",
      name: "1.5 Years",
      icon: <SiTailwindcss />,
    },
    {
      id: "4321098765",
      name: "6 Months+",
      icon: <IoLogoWordpress />,
    },
    {
      id: "3210987654",
      name: "1 Year",
      icon: <IoLogoNodejs />,
    },
    {
      id: "2109876543",
      name: "1 Year",
      icon: <SiExpress />,
    },
    {
      id: "1098765432",
      name: "1 Year",
      icon: <SiMongodb />,
    },
    {
      id: "0987654321",
      name: "6 Months",
      icon: <SiLinux />,
    },
    {
      id: "9876543210",
      name: "2 months",
      icon: <SiFlutter />,
    }
  ];

  return (
    <div className='about-container' id='light'>
      <div className="myself">
        <div data-aos="fade-right" data-aos-duration="1000" className="myself-data">
          <img src="/arifian_profile.jpg" alt="" />
          <h1 className='text-1xl font-bold tracking-widest'>Arifian Saputra</h1>
          <p className='opacity-80 text-xs'>Front End Web Developer | RHCSA | RHCI </p> 
            <p> Currently focusing as an instructor of IBM Academy for Hybrid Cloud and AI. With a goal to become a Full-Stack Web Developer and a better instructor.</p>
          <a href="#contacts"><button className='contact-btn'>Stay in Touch</button></a>
        </div>
      </div>
      <div className="stacks">
        <h1 data-aos="fade-left" data-aos-duration="1000" className='gradient-title text-4xl'>Tech Stacks</h1>
        <div className="stacks-point" data-aos="zoom-in" data-aos-duration="1000">
          {
            stacksData.map((stack) => (
              <div key={stack.id} className='points'>
                <p>{stack.icon}</p>
                <p>{stack.name}</p>
              </div>
            ))
          }
        </div>
        <h1 data-aos="fade-left" data-aos-duration="1000" className='gradient-title text-4xl'>Experiences</h1>
        <div data-aos="zoom-in" data-aos-duration="1000" className="stacks-point">
          {
            expData.map((exp) => (
              <div key={exp.id} className='points'>
                <p>{exp.icon}</p>
                <p>{exp.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
