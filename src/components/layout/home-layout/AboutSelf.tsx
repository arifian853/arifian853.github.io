// Web Tech Stack
import {
    FaHtml5, FaNpm, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaPython,
    FaLinux, FaGitAlt, FaWordpress, FaRedhat
} from "react-icons/fa";

import {
    SiJavascript, SiExpress, SiMongodb, SiTailwindcss, SiShadcnui, SiTensorflow,
    SiKeras, SiPandas, SiNumpy, SiVisualstudiocode, SiXampp, SiPostman
} from "react-icons/si";



export const AboutSelf = () => {
    return (
        <div className="bg-[#E0E0E0] dark:bg-[#30323D] flex md:flex-row flex-col items-center justify-center md:h-screen h-auto p-5" id="aboutself">

            <div className="flex md:flex-row flex-col items-center md:h-[500px] justify-center">

                <div className=" h-full w-full p-5 text-center flex flex-col items-center justify-center gap-3">
                    <img className="h-32 w-32" src="/user.png" alt="" />
                    <p className="display-font text-xl text-center">Arifian Saputra</p>
                    <p className="text-sm opacity-75">AI Technical Mentor | Web Developer | RHCSA</p>
                    <p className="md:w-2/3 w-full">Informatics Engineering fresh graduate with a focus on Artificial Intelligence, Machine Learning, and Full Stack Web Development. RHCSA certified.</p>
                </div>

                <div className="h-full w-full p-5 text-center flex items-center justify-center">
                    <div className="text-4xl m-3 flex flex-wrap gap-4 justify-center items-center">
                        <FaHtml5 /> <FaCss3Alt /> <SiJavascript /> <FaReact /> <FaNodeJs /> <SiExpress /> <SiMongodb /> <FaBootstrap /> <SiTailwindcss /> <SiShadcnui />
                        <FaPython /> <SiTensorflow /> <SiKeras /> <SiPandas /> <SiNumpy /> <FaRedhat /> <SiVisualstudiocode />  <FaLinux /> <FaNpm /> <SiXampp /> <FaGitAlt /> <SiPostman /> <FaWordpress />
                    </div>
                </div>

            </div>
        </div>
    )
}
