import { Navbar } from '@/components/layout/Navbar';
import { Helmet } from 'react-helmet';
import {
  FaReact, FaBootstrap, FaNodeJs, FaPython, FaRedhat,
  FaArrowLeft
} from "react-icons/fa";

import {
  SiExpress, SiMongodb, SiTailwindcss, SiShadcnui, SiTensorflow,
  SiKeras
} from "react-icons/si";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

import { HiOutlineMail } from "react-icons/hi";

const tech_stacks = [
  { icon: <FaReact />, name: "React" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiExpress />, name: "Express.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <FaBootstrap />, name: "Bootstrap" },
  { icon: <SiShadcnui />, name: "Shadcn/UI" },
  { icon: <FaPython />, name: "Python" },
  { icon: <SiTensorflow />, name: "TensorFlow" },
  { icon: <SiKeras />, name: "Keras" },
  { icon: <FaRedhat />, name: "Red Hat" },
]

const contacts = [
  { name: 'Arifian Saputra', logo: <FaFacebook />, link: 'https://www.facebook.com/arifian.syaputra.9/' },
  { name: '@arifiansaputra_', logo: <FaInstagram />, link: 'https://www.instagram.com/arifiansaputra_/' },
  { name: '@ArifianSaputra0', logo: <FaXTwitter />, link: 'https://x.com/ArifianSaputra0' },
  { name: 'Arifian Saputra', logo: <FaLinkedin />, link: 'https://www.linkedin.com/in/arifian-saputra-08135a178/' },
  { name: 'arifian853', logo: <FaGithub />, link: 'https://github.com/arifian853' },
]


export const About = () => {

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Arifian Saputra - About</title>
      </Helmet>
      <div className="bg-[#E0E0E0] dark:bg-[#121212] min-h-screen h-auto py-10 px-4 sm:px-6 md:px-8 flex items-center justify-center">
        <div data-aos="fade-in" data-aos-duration='900' className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center h-auto gap-8 md:gap-10">

          <div className="w-full p-5 text-center flex flex-col items-center justify-center gap-4">
            <img 
              className="h-32 w-32 md:h-40 md:w-40 rounded-full border-2 border-teal-500 object-cover shadow-md transition-transform hover:scale-105 duration-300" 
              src="/user.jpeg" 
              alt="Arifian Saputra" 
            />
            <p className="display-font text-xl md:text-2xl text-center border-teal-500 border-b pb-1">Arifian Saputra</p>
            <p className="text-sm md:text-base opacity-75 font-medium">AI Technical Mentor | Full - Stack Web Developer</p>
            <p className="w-full max-w-xl md:max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. Currently served as a Head Mentor of AI Development program at Infinite Learning.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <a data-aos="fade-out" data-aos-duration='900' href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1 px-5"> CV </Button>
              </a>
              <a data-aos="fade-out" data-aos-duration='900' href="/abstract.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1 px-5"> Thesis Abstract </Button>
              </a>
            </div>
          </div>

          <div className="w-full">
            <h1 className="display-font text-xl md:text-2xl text-center border-teal-500 border-b pb-1 mb-6 max-w-xs mx-auto">Tech Stacks</h1>

            <div className="text-3xl md:text-4xl flex flex-wrap gap-5 justify-center items-center max-w-md mx-auto">
              {
                tech_stacks.map((tag, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger data-aos="fade-out" data-aos-duration='900' className="transition-all duration-300">
                        <span className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-teal-500 transform hover:scale-110 transition-all duration-300">{tag.icon}</span>
                      </TooltipTrigger>
                      <TooltipContent className="flex flex-row items-center justify-center gap-2 text-sm">
                        {tag.icon} {tag.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              }
            </div>
          </div>

          <div className="w-full">
            <h1 className="display-font text-xl md:text-2xl text-center border-teal-500 border-b pb-1 mb-6 max-w-xs mx-auto">Stay in Touch</h1>
            
            <div className='text-3xl md:text-4xl flex flex-wrap gap-5 justify-center items-center max-w-md mx-auto'>
              {
                contacts.map((contact, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a 
                          data-aos="fade-out" 
                          data-aos-duration='900' 
                          className="text-3xl md:text-4xl hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-teal-500 transform hover:scale-110 transition-all duration-300" 
                          href={contact.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={contact.name}
                        >
                          {contact.logo}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className="flex flex-row items-center justify-center gap-2 text-sm">
                        {contact.logo} {contact.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              }
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a data-aos="fade-out" data-aos-duration='900' href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button className="flex flex-row justify-center items-center gap-1 px-4"> Email <HiOutlineMail className="ml-1" /> </Button>
            </a>
            <a data-aos="fade-out" data-aos-duration='900' href="mailto:arifian.saputra@infinitelearning.id" target="_blank" rel="noopener noreferrer">
              <Button className="flex flex-row justify-center items-center gap-1 px-4"> Work Email <HiOutlineMail className="ml-1" /> </Button>
            </a>
          </div>
          
          <Link to='/'> 
            <Button className="mt-4 flex flex-row justify-center items-center gap-1 px-5"> 
              <FaArrowLeft className="mr-1" /> Back 
            </Button> 
          </Link>
        </div>
      </div>
    </>
  )
}