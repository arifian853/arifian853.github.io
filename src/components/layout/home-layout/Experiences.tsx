import { Button } from "@/components/ui/button"
import { HiOutlineExternalLink } from "react-icons/hi"


export const Experiences = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='600' className="display-font text-4xl border-red-500 border-b mb-3">Experiences</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Work experiences, interns, and independent study</p>
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] flex md:flex-row flex-col items-center justify-center min-h-[600px] h-auto p-5 gap-5 md:w-4/5 w-full flex-wrap" id="aboutself">

            </div>

            <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1"> More at LinkedIn <HiOutlineExternalLink /> </Button>
            </a>

        </div>
    )
}