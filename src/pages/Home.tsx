import { AboutSelf } from "@/components/layout/home-layout/AboutSelf"
import { Educations } from "@/components/layout/home-layout/Educations"
import { Experiences } from "@/components/layout/home-layout/Experiences"
import { Greeting } from "@/components/layout/home-layout/Greeting"
import { Project } from "@/components/layout/home-layout/Project"
import { Helmet } from "react-helmet"

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Arifian Saputra</title>
            </Helmet>
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24]">
                <Greeting />
                <AboutSelf />
                <Project />
                <br />
                <Experiences />
                <br />
                <Educations />
            </div>
        </>
    )
}
