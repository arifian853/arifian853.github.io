import { Navbar } from '@/components/layout/Navbar';
import { Helmet } from 'react-helmet';
import {
  FaReact, FaBootstrap, FaNodeJs, FaPython, FaRedhat
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


export const About = () => {

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Arifian Saputra - About</title>
      </Helmet>
      <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-screen p-5 flex items-center justify-center">
        <div data-aos="fade-in" data-aos-duration='800' className="flex flex-col items-center justify h-auto gap-5">

          <div className="w-full p-5 text-center flex flex-col items-center justify-center gap-3">
            <img className="h-32 w-32" src="/user.png" alt="" />
            <p className="display-font text-xl text-center border-red-500 border-b">Arifian Saputra</p>
            <p className="text-sm opacity-75">AI Technical Mentor | Full - Stack Web Developer | RHCSA</p>
            <p className="md:w-1/3 w-full">Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. RHCSA certified.</p>
          </div>

          <h1 className="display-font text-xl text-center border-red-500 border-b">Tech Stacks</h1>
    
            <div className="text-4xl flex flex-wrap gap-4 justify-center items-center w-[300px]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaReact className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>React</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaNodeJs className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Node.js</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiExpress className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Express.js</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiMongodb className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>MongoDB</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaBootstrap className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bootstrap</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiTailwindcss className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tailwind CSS</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiShadcnui className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shadcn/UI</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaPython className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Python</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiTensorflow className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>TensorFlow</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SiKeras className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Keras</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaRedhat className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Red Hat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

          </div>

        </div>

    </>
  )
}
