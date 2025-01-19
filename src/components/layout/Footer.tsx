import { FaReact } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-[#EFEFEF] p-5 md:px-10 m-5 dark:bg-[#1C1C1C] rounded-lg shadow-lg">
        <p className="text-center display-font flex items-center justify-center gap-2">Arifian Saputra, {new Date().getFullYear()}. Made with React <span><FaReact /></span></p>
    </footer>
  )
}