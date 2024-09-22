import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    
    const navigate = useNavigate();
    return (
        <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-screen flex justify-center items-center p-5">
            <Helmet>
                <title>Arifian Saputra - Not Found</title>
            </Helmet>
            <div data-aos="zoom-out" className="w-10/12 md:w-96 bg-[#BABFBF] dark:bg-[#1C1D24] shadow-lg p-5 flex justify-center items-center flex-col gap-4 rounded-md">
                <h1 className="display-font font-semibold text-xl"><span className="text-red-500">404</span> | Page not found</h1>

                <Button className="display-font font-semibold w-24" onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>

        </div>
    )
}
