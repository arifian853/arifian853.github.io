import { ThemeToggler } from "@/components/ThemeToggler";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { ParticlePreset } from "../ParticlePreset";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="bg-[#EFEFEF] p-5 md:px-10 m-5 dark:bg-[#1C1C1C] rounded-lg shadow-lg display-font relative z-50">
      <div className="flex justify-between items-center">

        <div className="flex items-center justify-between gap-1 md:gap-2 flex-1 md:flex-initial">
          <Link to='/'>
            <span className="font-semibold display-font hover:border-b hover:border-teal-500 text-sm md:text-base">
              Arifian S
            </span>
          </Link> 
          <div className="flex items-center gap-3">
            <ThemeToggler /> 
            <ParticlePreset />
          </div>
        </div>

        <div onClick={() => setToggle(!toggle)} className='ml-3 text-3xl cursor-pointer md:hidden transition-all duration-900 ease flex-shrink-0'>
          {
            toggle === false ? (
              <HiOutlineMenu />
            ) : (
              <IoClose />
            )
          }
        </div>
        
        <ul className={`bg-[#EFEFEF] dark:bg-[#1C1C1C] md:border-none border rounded-lg md:shadow-none shadow-lg md:m-0 p-5 m-5 md:p-0 flex flex-col items-center gap-4 md:flex-row absolute md:static md:z-auto z-[100] md:right-0 right-0 w-[200px] md:w-auto md:pl-0 transition-all duration-100 ease-in-out ${toggle ? 'top-24 opacity-100' : 'top-24 z-[-99] right-72 opacity-0 md:opacity-100'}`}>
          <li className="border-b p-1 border-[#1C1C1C] dark:border-[#EFEFEF] hover:border-teal-500 dark:hover:border-teal-500"><Link to='/about'>About</Link></li>
          <li className="border-b p-1 border-[#1C1C1C] dark:border-[#EFEFEF] hover:border-teal-500 dark:hover:border-teal-500"><Link to='/project'>Projects</Link></li>
          <li className="border-b p-1 border-[#1C1C1C] dark:border-[#EFEFEF] hover:border-teal-500 dark:hover:border-teal-500"><Link to='/chat-ai'>Arifian.AI</Link></li>
          <li className="border-b p-1 border-[#1C1C1C] dark:border-[#EFEFEF] hover:border-teal-500 dark:hover:border-teal-500"><Link to='/write'>Write</Link></li>
          <li className="text-3xl hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-teal-500"><a href="https://github.com/arifian853" rel="noopener noreferrer" target="blank"><FaGithub /></a></li>
        </ul>
      </div>
    </nav>
  )
}