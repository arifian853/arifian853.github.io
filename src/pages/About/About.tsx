import { Helmet } from 'react-helmet';
import {
  FaReact, FaBootstrap, FaNodeJs, FaPython, FaRedhat,
  FaArrowLeft, FaDownload
} from "react-icons/fa";

import {
  SiExpress, SiMongodb, SiTailwindcss, SiShadcnui, SiTensorflow,
  SiKeras, SiVite, SiTypescript, SiFramer, SiDocker
} from "react-icons/si";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiGooglegemini } from "react-icons/si";

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

const fullTechStacks = {
  frontend: [
    { icon: <SiVite />, name: "Vite" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "TailwindCSS" },
    { icon: <SiShadcnui />, name: "Shadcn/UI" },
    { icon: <SiFramer />, name: "Framer Motion" },
    { icon: <FaReact />, name: "React TSParticles" },
  ],
  backend: [
    { icon: <FaNodeJs />, name: "NodeJS" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiDocker />, name: "Docker" },
  ],
  ai: [
    { icon: <SiGooglegemini />, name: "Google Gemini Generative AI" },
  ]
}

const contacts = [
  { name: 'Arifian Saputra', logo: <FaFacebook />, link: 'https://www.facebook.com/arifian.syaputra.9/' },
  { name: '@arifiansaputra_', logo: <FaInstagram />, link: 'https://www.instagram.com/arifiansaputra_/' },
  { name: '@ArifianSaputra0', logo: <FaXTwitter />, link: 'https://x.com/ArifianSaputra0' },
  { name: 'Arifian Saputra', logo: <FaLinkedin />, link: 'https://www.linkedin.com/in/arifian-saputra-08135a178/' },
  { name: 'arifian853', logo: <FaGithub />, link: 'https://github.com/arifian853' },
]

export const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
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
              {/* CV Modal */}
              <Dialog open={isCVModalOpen} onOpenChange={setIsCVModalOpen}>
                <DialogTrigger asChild>
                  <Button data-aos="fade-out" data-aos-duration='900' className="flex flex-row justify-center items-center gap-1 px-5">
                    CV
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto md:w-full w-[350px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-1">Curriculum Vitae</DialogTitle>
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => handleDownload('/cv.pdf', 'Arifian_Saputra_CV.pdf')}
                        className="flex items-center gap-2"
                      >
                        <FaDownload /> Download CV
                      </Button>
                    </div>
                  </DialogHeader>
                  
                  <div className="w-full h-[60vh] border rounded-lg overflow-hidden">
                    <iframe
                      src="/cv.pdf"
                      className="w-full h-full"
                      title="CV Preview"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Thesis Abstract Modal */}
              <Dialog open={isThesisModalOpen} onOpenChange={setIsThesisModalOpen}>
                <DialogTrigger asChild>
                  <Button data-aos="fade-out" data-aos-duration='900' className="flex flex-row justify-center items-center gap-1 px-5">
                    Thesis Abstract
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto md:w-full w-[350px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-1">Thesis Abstract</DialogTitle>
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => handleDownload('/abstract.pdf', 'Arifian_Saputra_Thesis_Abstract.pdf')}
                        className="flex items-center gap-2"
                      >
                        <FaDownload /> Download Abstract
                      </Button>
                    </div>
                  </DialogHeader>
                  
                  <div className="w-full h-[60vh] border rounded-lg overflow-hidden">
                    <iframe
                      src="/abstract.pdf"
                      className="w-full h-full"
                      title="Thesis Abstract Preview"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Tech Stack Modal */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex flex-row justify-center items-center gap-1 px-5">
                    Tech Stack
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto md:w-max w-[350px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-1">Complete Tech Stack</DialogTitle>
                    <p className='text-center'>For this portfolio website</p>
                  </DialogHeader>
                  
                  <div className="space-y-8">
                    {/* Frontend Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-teal-500 border-b border-teal-500 pb-2">Frontend</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {fullTechStacks.frontend.map((tech, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:drop-shadow-[0_4px_4px_rgba(45,212,191,0.5)] hover:border-teal-500 group">
                                  <span className="text-3xl mb-2 group-hover:text-teal-500 transition-colors duration-300">
                                    {tech.icon}
                                  </span>
                                  <span className="text-sm font-medium text-center">{tech.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{tech.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    {/* Backend Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-teal-500 border-b border-teal-500 pb-2">Backend</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {fullTechStacks.backend.map((tech, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:drop-shadow-[0_4px_4px_rgba(45,212,191,0.5)] hover:border-teal-500 group">
                                  <span className="text-3xl mb-2 group-hover:text-teal-500 transition-colors duration-300">
                                    {tech.icon}
                                  </span>
                                  <span className="text-sm font-medium text-center">{tech.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{tech.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    {/* AI Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-teal-500 border-b border-teal-500 pb-2">AI</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fullTechStacks.ai.map((tech, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:drop-shadow-[0_4px_4px_rgba(45,212,191,0.5)] hover:border-teal-500 group">
                                  <span className="text-3xl mb-2 group-hover:text-teal-500 transition-colors duration-300">
                                    {tech.icon}
                                  </span>
                                  <span className="text-sm font-medium text-center">{tech.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{tech.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                        <span className="hover:drop-shadow-[0_4px_4px_rgba(45,212,191,0.5)] hover:text-teal-500 transform hover:scale-110 transition-all duration-300">{tag.icon}</span>
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
                          className="text-3xl md:text-4xl hover:drop-shadow-[0_4px_4px_rgba(45,212,191,0.5)] hover:text-teal-500 transform hover:scale-110 transition-all duration-300" 
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