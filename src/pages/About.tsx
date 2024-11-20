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
      <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] min-h-screen h-auto my-5 p-5 flex items-center justify-center">
        <div data-aos="fade-in" data-aos-duration='900' className="flex flex-col items-center justify h-auto gap-5">

          <div className="w-full p-5 text-center flex flex-col items-center justify-center gap-3">
            <img className="h-32 w-32 rounded-full border-2 border-red-500" src="/user.jpeg" alt="" />
            <p className="display-font text-xl text-center border-red-500 border-b">Arifian Saputra</p>
            <p className="text-sm opacity-75">AI Technical Mentor | Full - Stack Web Developer | RHCSA</p>
            <p className="md:w-1/3 w-full">Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. RHCSA certified. Currently served as a mentor of IBM Academy: Advance AI program at Infinite Learning.</p>
            <div className="flex gap-3">
              <a data-aos="fade-out" data-aos-duration='900' href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1"> CV </Button>
              </a>
              <a data-aos="fade-out" data-aos-duration='900' href="/abstract.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1"> Thesis Abstract </Button>
              </a>
            </div>
          </div>

          <h1 className="display-font text-xl text-center border-red-500 border-b">Tech Stacks</h1>

          <div className="text-4xl flex flex-wrap gap-4 justify-center items-center w-[300px]">
            {
              tech_stacks.map((tag, index) => (
                <TooltipProvider>
                  <Tooltip key={index}>
                    <TooltipTrigger data-aos="fade-out" data-aos-duration='900'>
                      <span className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500">{tag.icon}</span>
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-row items-center justify-center gap-2">
                      {tag.icon} {tag.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            }
          </div>

          <h1 className="display-font text-xl text-center border-red-500 border-b">Stay in Touch</h1>
          <div className='text-4xl flex flex-wrap gap-4 justify-center items-center w-[300px]'>
            {
              contacts.map((contact, index) => (
                <TooltipProvider>
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <a data-aos="fade-out" data-aos-duration='900' className="text-4xl hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" href={contact.link} target="_blank" rel="noopener noreferrer">{contact.logo}</a>
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-row items-center justify-center gap-2">
                      {contact.logo} {contact.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            }
          </div>

          <div className="flex gap-3">
            <a data-aos="fade-out" data-aos-duration='900' href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button className="flex flex-row justify-center items-center gap-1"> Email <HiOutlineMail /> </Button>
            </a>
            <a data-aos="fade-out" data-aos-duration='900' href="mailto:arifian.saputra@infinitelearning.id" target="_blank" rel="noopener noreferrer">
              <Button className="flex flex-row justify-center items-center gap-1"> Work Email <HiOutlineMail /> </Button>
            </a>
          </div>
          <Link to='/'> <Button className="mt-5 flex flex-row justify-center items-center gap-1"> <FaArrowLeft /> Back </Button> </Link>
        </div>

      </div>

    </>
  )
}