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
            <p className="md:w-1/3 w-full">Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. RHCSA certified. Currently served as a mentor of IBM Academy: Advance AI program at Infinite Learning.</p>
          </div>

          <h1 className="display-font text-xl text-center border-red-500 border-b">Tech Stacks</h1>

          <div className="text-4xl flex flex-wrap gap-4 justify-center items-center w-[300px]">
            {
              tech_stacks.map((tag, index) => (
                <TooltipProvider>
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <span className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500">{tag.icon}</span>
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-row items-center justify-center gap-2">
                      {tag.icon} {tag.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            }
             <Link to='/'> <Button className="mt-5 flex flex-row justify-center items-center gap-1"> <FaArrowLeft /> Back </Button> </Link>
          </div>

        </div>

      </div>

    </>
  )
}
