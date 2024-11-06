import { Button } from "@/components/ui/button"

import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";

import { HiOutlineMail } from "react-icons/hi";

export const Contact = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='600' className="display-font text-4xl border-red-500 border-b mb-3">Stay in Touch</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Social media and contacts</p>
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] flex md:flex-row flex-col items-center justify-center min-h-[400px] h-auto p-5 gap-5 md:w-4/5 w-full flex-wrap" id="aboutself">
                <div className="flex items-center justify-center gap-6">
                    <a className="text-4xl" href="" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a className="text-4xl" href="" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a className="text-4xl" href="" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                    <a className="text-4xl" href="" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
                <div className="flex items-center justify-center gap-6">
                   
                </div>
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