import React from 'react'
import { IoLogoHtml5, IoLogoCss3, IoLogoSass, IoLogoNodejs } from 'react-icons/io'
import { SiBootstrap, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiLinux, SiFlutter, SiVisualstudiocode, SiXampp, SiPostman } from 'react-icons/si'
import { FaNpm, FaReact } from 'react-icons/fa'
import { Tabs } from 'flowbite-react'
import { BsGit, BsTerminalFill, BsWordpress } from 'react-icons/bs'

export const About = () => {


  const stacksData = [
    {
      id: "1234567890",
      name: "HTML",
      icon: <IoLogoHtml5 />,
      exp: "4 Years",
    },
    {
      id: "9876543210",
      name: "CSS",
      icon: <IoLogoCss3 />,
      exp: "4 Years",
    },
    {
      id: "0123456789",
      name: "JavaScript",
      icon: <SiJavascript />,
      exp: "2 Years",
    },
    {
      id: "8765432109",
      name: "React",
      icon: <FaReact />,
      exp: "2 Years",
    },
    {
      id: "7654321098",
      name: "SASS/SCSS",
      icon: <IoLogoSass />,
      exp: "6 Months+",
    },
    {
      id: "6543210987",
      name: "Bootstrap",
      icon: <SiBootstrap />,
      exp: "3 Years",
    },
    {
      id: "5432109876",
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      exp: "2 Years",
    },

    {
      id: "3210987654",
      name: "Node JS",
      icon: <IoLogoNodejs />,
      exp: "1 Year",
    },
    {
      id: "2109876543",
      name: "Express JS",
      icon: <SiExpress />,
      exp: "1 Year",
    },
    {
      id: "1098765432",
      name: "MongoDB",
      icon: <SiMongodb />,
      exp: "1 Year",
    },
    {
      id: "9876543210",
      name: "Flutter",
      icon: <SiFlutter />,
      exp: "2 Months+",
    }

  ];

  const toolsData = [
    {
      id: "1234567890",
      name: "Visual Studio Code",
      icon: <SiVisualstudiocode />,
      exp: "4 Years",
    },
    {
      id: "9876543210",
      name: "Git",
      icon: <BsGit />,
      exp: "3 Years",
    },
    {
      id: "0987654321",
      name: "Linux",
      icon: <SiLinux />,
      exp: "6 Months+",
    },
    {
      id: "8765432109",
      name: "XAMPP",
      icon: <SiXampp />,
      exp: "1 Year",
    },
    {
      id: "7654321098",
      name: "Postman",
      icon: <SiPostman />,
      exp: "1 Year",
    },
    {
      id: "6543210987",
      name: "CLI",
      icon: <BsTerminalFill />,
      exp: "6 Months",
    },
    {
      id: "4321098765",
      name: "NPM",
      icon: <FaNpm />,
      exp: "3 Years",
    },
    {
      id: "3210987654",
      name: "Wordpress",
      icon: <BsWordpress />,
      exp: "1 Year",
    },
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
        <Tabs.Group
          aria-label="Tabs with underline"
          // eslint-disable-next-line react/style-prop-object
          style="pills"
          class='flex justify-center gap-2'
          data-aos="zoom-in" data-aos-duration="1000"
        >
          <Tabs.Item
            icon={""}
            title="Tech stacks"
            data-aos="zoom-in" data-aos-duration="1000"
          >
            <div data-aos="fade-right" data-aos-duration="1000" className='flex flex-col justify-center items-center'>
              <div className="stacks-point">
                {
                  stacksData.map((stack) => (
                    <div key={stack.id} className='points'>
                      <p className='text-2xl'>{stack.icon}</p>
                      <div className="text-left">
                        <p className='text-sm'>{stack.name}</p>
                        <p className='text-xs opacity-70'>{stack.exp}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item
            icon={""}
            title="Tools"
            data-aos="zoom-in" data-aos-duration="1000"
          >
            <div data-aos="fade-right" data-aos-duration="1000" className='flex flex-col justify-center items-center'>
              <div className="stacks-point">
                {
                  toolsData.map((tool) => (
                    <div key={tool.id} className='points'>
                      <p className='text-2xl'>{tool.icon}</p>
                      <div className="text-left">
                        <p className='text-sm'>{tool.name}</p>
                        <p className='text-xs opacity-70'>{tool.exp}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  )
}
