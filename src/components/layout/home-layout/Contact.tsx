import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

import { HiOutlineMail } from "react-icons/hi";

const contacts = [
    { name: 'Arifian Saputra', logo: <FaFacebook />, link: 'https://www.facebook.com/arifian.syaputra.9/' },
    { name: '@arifiansaputra_', logo: <FaInstagram />, link: 'https://www.instagram.com/arifiansaputra_/' },
    { name: '@ArifianSaputra0', logo: <FaXTwitter />, link: 'https://x.com/ArifianSaputra0' },
    { name: 'Arifian Saputra', logo: <FaLinkedin />, link: 'https://www.linkedin.com/in/arifian-saputra-08135a178/' },
    { name: 'arifian853', logo: <FaGithub />, link: 'https://github.com/arifian853' },
]

export const Contact = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='900' className="display-font text-4xl border-red-500 border-b mb-3">Stay in Touch</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Feel free to reach out!</p>
            <div className="bg-[#E0E0E0] dark:bg-[#121212] flex flex-row items-center justify-center min-h-[250px] h-auto p-5 gap-5 md:w-4/5 w-full flex-wrap" id="aboutself">
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
                <a href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Button className="flex flex-row justify-center items-center gap-1"> Email <HiOutlineMail /> </Button>
                </a>
                <a href="mailto:arifian.saputra@infinitelearning.id" target="_blank" rel="noopener noreferrer">
                    <Button className="flex flex-row justify-center items-center gap-1"> Work Email <HiOutlineMail /> </Button>
                </a>
            </div>

        </div>
    )
}