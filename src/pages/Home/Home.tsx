import { AboutSelf } from "@/pages/Home/AboutSelf"
import { Contact } from "@/pages/Home/Contact"
import { Educations } from "@/pages/Home/Educations"
import { Experiences } from "@/pages/Home/Experiences"
import { Greeting } from "@/pages/Home/Greeting"
import { Project } from "@/pages/Home/Project"
import { Helmet } from "react-helmet"

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Arifian Saputra</title>
            </Helmet>
            <div className="bg-[#E0E0E0] dark:bg-[#121212]">
                <Greeting />
                <AboutSelf />
                <Project />
                <br />
                <Experiences />
                <br />
                <Educations />
                <br />
                <Contact />
            </div>
        </>
    )
}