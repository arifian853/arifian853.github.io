// Web Tech Stack
import { Button } from "@/components/ui/button";
import {
    FaReact, FaBootstrap, FaNodeJs, FaPython, FaRedhat
} from "react-icons/fa";

import {
    SiExpress, SiMongodb, SiTailwindcss, SiShadcnui, SiTensorflow,
    SiKeras
} from "react-icons/si";
import { Link } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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

export const AboutSelf = () => {
    return (
        <div className="bg-[#E0E0E0] dark:bg-[#30323D] flex md:flex-row flex-col items-center justify-center md:h-screen h-auto p-5" id="aboutself">

            <div data-aos="fade-in" data-aos-duration='800' className="flex md:flex-row flex-col items-center md:h-[500px] justify-center">

                <div className=" h-full w-full p-5 text-center flex flex-col items-center justify-center gap-3">
                    <img className="h-32 w-32" src="/user.png" alt="" />
                    <p className="display-font text-xl text-center border-red-500 border-b">Arifian Saputra</p>
                    <p className="text-sm opacity-75 ">AI Technical Mentor | Full - Stack Web Developer | RHCSA</p>
                    <p className="md:w-2/3 w-full">Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. RHCSA certified. Currently served as a mentor of IBM Academy: Advance AI program at Infinite Learning.</p>
                    <Link to='/about'> <Button> More info</Button> </Link>
                </div>

                <div className="h-full w-full p-5 text-center flex items-center justify-center">
                    <div className="text-4xl m-3 flex flex-wrap gap-4 justify-center items-center w-2/3">
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
                    </div>
                </div>

            </div>
        </div>
    )
}
