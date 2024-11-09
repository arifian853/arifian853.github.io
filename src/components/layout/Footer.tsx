import { FaReact } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-[#BABFBF] p-5 md:px-10 m-5 dark:bg-[#30323D] rounded-lg shadow-lg">
        <p className="text-center display-font flex items-center justify-center gap-2">Arifian Saputra, {new Date().getFullYear()}. Made with React <span><FaReact /></span></p>
    </footer>
  )
}
