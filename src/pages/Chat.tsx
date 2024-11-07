import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] h-screen flex justify-center items-center p-5">
            <Helmet>
                <title>Soon! | Arifian.AI </title>
            </Helmet>
            <div data-aos="zoom-out" data-aos-duration='600' className="w-11/12 md:w-96 bg-[#BABFBF] dark:bg-[#30323D] shadow-lg p-5 flex justify-center items-center flex-col gap-4 rounded-md">
                <h1 className="display-font font-semibold text-xl"><span className="text-red-500">Soon!</span> | Arifian<span className="text-red-500">.AI</span></h1>
                <p>An AI chatbot that impersonating me!</p>
                <p>See the development here: </p>

                <a href="https://github.com/arifian853/arifian.ai" target="_blank" rel="noreferrer noopener"> <Button className="display-font font-semibold w-full flex flex-row justify-center items-center gap-1">Development Repository <HiOutlineExternalLink /></Button></a>
                <Button className="display-font font-semibold w-24" onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>

        </div>
    )
}
