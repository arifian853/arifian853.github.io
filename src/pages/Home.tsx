import { AboutSelf } from "@/components/layout/home-layout/AboutSelf"
import { Greeting } from "@/components/layout/home-layout/Greeting"
import { Helmet } from "react-helmet"

export const Home = () => {
    return (
        <>

            <Helmet>
                <title>Arifian Saputra</title>
            </Helmet>
            <div className="bg-[#E0E0E0] dark:bg-[#30323D]">
                <Greeting />
                <AboutSelf />
            </div>
        </>
    )
}
