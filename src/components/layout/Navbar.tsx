import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { Divider } from "./home-layout/Divider";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="bg-[#BABFBF] p-5 md:px-10 m-5 dark:bg-[#1C1D24] rounded-lg shadow-lg display-font">
      <div className="flex justify-between items-center">

        <div className="flex items-center justify-between gap-3">
          <Link to='/'><span className="font-semibold display-font">Arifian Saputra</span></Link> <ModeToggle />
        </div>
        
        <div onClick={() => setToggle(!toggle)} className='text-3xl cursor-pointer md:hidden transition-all duration-900 ease'>
          {
            toggle === false ? (
              <HiOutlineMenu />
            ) : (
              <IoClose />
            )
          }
        </div>
        <ul className={`bg-[#BABFBF] dark:bg-[#1C1D24] md:border-none border rounded-lg md:shadow-none shadow-lg md:m-0 p-5 m-5 md:p-0 flex flex-col items-center gap-4 md:flex-row absolute md:static md:z-auto z-[2] md:right-0 right-0 w-[200px] md:w-auto md:pl-0 transition-all duration-300 ease-in-out ${toggle ? 'top-24 opacity-100' : 'top-24 z-[-2] opacity-0 md:opacity-100'}`}>
          <li className="border-b border-[#1C1D24] dark:border-[#BABFBF] hover:border-red-500 dark:hover:border-red-500"><Link to='/about'>About</Link></li>
          <li className="border-b border-[#1C1D24] dark:border-[#BABFBF] hover:border-red-500 dark:hover:border-red-500"><Link to='/nowhere'>Where</Link></li>
          <li className="text-3xl hover:text-red-500"><a href="https://github.com/arifian853" rel="noopener noreferrer" target="blank"><FaGithub /></a></li>
        </ul>
      </div>
      <Divider />
    </nav>
  )
}
