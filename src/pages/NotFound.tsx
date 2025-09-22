import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { useTheme } from "@/hooks/useTheme";

export const NotFound = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    
    return (
        <div className="bg-[#E0E0E0] dark:bg-[#121212] h-screen flex justify-center items-center p-5 relative">
            <ParticlesBackground isDark={isDark} />
            <Helmet>
                <title>Arifian Saputra - Not Found</title>
            </Helmet>
            <motion.div 
              initial={{ scale: 1 }}
              animate={{ scale: 0 }}
              transition={{ duration: 0.6 }}
              className="w-11/12 md:w-96 bg-[#EFEFEF] dark:bg-[#1C1C1C] shadow-lg p-5 flex justify-center items-center flex-col gap-4 rounded-md relative z-10">
                <h1 className="display-font font-semibold text-xl"><span className="text-teal-500">404</span> | Page not found</h1>

                <Button onClick={() => navigate(-1)} className="flex flex-row justify-center items-center gap-1">
                    <FaArrowLeft /> Go Back
                </Button>
            </motion.div>
        </div>
    )
}