import { Helmet } from "react-helmet"
import { Link, useParams } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn, SiTailwindcss, SiMongodb, SiExpress, SiRedux } from "react-icons/si";

const featured_projects = [
    {
        id: 1,
        title: "Rainfall Prediction with LSTM + Attention",
        description: "This project explores the use of LSTM (Long Short-Term Memory) and LSTM with an Attention Layer to predict daily rainfall rates in Batam City. The primary goal is to assess the performance difference between the two models when the Attention Layer is implemented. The study leverages the BMKG DataOnline climate dataset and aims to improve prediction accuracy, especially in the context of dynamic and extreme weather changes. Below is the abstract and the results of the study: The rainy season in Batam City significantly impacts various aspects of life, such as agriculture, food security, and clean water availability. Therefore, it is crucial to accurately predict rainfall patterns, especially in the face of increasingly dynamic and extreme weather changes. This study aims to determine whether the Attention Mechanism layer in the Long Short-Term Memory (LSTM) algorithm can improve the accuracy of daily rainfall prediction using a web application. LSTM with the Attention Mechanism layer is a regular LSTM algorithm enhanced with an additional Attention layer to observe input variations and give special attention to specific inputs. The study results show that the LSTM model with the additional Attention layer produces the best predictions and competitive error metrics compared to the LSTM model without Attention. The best results show a variability value (R²) of 0.2986 compared to the regular LSTM with a value of 0.2580, an MSE value of 0.0091 compared to the regular LSTM with a value of 0.0097, an RMSE value of 0.0957 compared to the regular LSTM with a value of 0.0985, and an MAE value slightly below the regular LSTM with a value of 0.0528 compared to 0.0516 for the regular LSTM. The percentage increase in accuracy based on variability is that the LSTM model with Attention achieves an improvement of 15.74%, based on MSE, it improves by 6.19%, based on RMSE, it improves by 2.84%, and according to MAE, it decreases by 2.33%, indicates that MAE is not too suitable for the LSTM with Attention model. The conclusion is that the LSTM model with Attention provides a significant increase in accuracy for rainfall prediction in Batam City.",
        image: "/project1.png",
        link: "https://github.com/arifian853/rainfall-predict-lstm-attention",
        demo: "https://rainfall-predict-lstm-attention.vercel.app/",
        tags: [<FaPython />, <FaReact />, <SiTailwindcss />, <SiJupyter />, <SiFlask />, <SiTensorflow />, <SiKeras />, <SiScikitlearn />]
    },
    {
        id: 2,
        title: "InfiniteTalk: A place for Mentors and Mentee connect and grow!",
        description: "A place for Mentors and Mentees connect and grow! This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other’s posts to help or share information!",
        image: "/project2.png",
        link: "https://github.com/arifian853/InfiniteTalk",
        demo: "#",
        tags: [<FaReact />, <SiTailwindcss />, <SiMongodb />, <SiExpress />, <FaNodeJs />, <SiRedux />]
    }
]


export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const project = featured_projects.find((project) => project.id.toString() === id);
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <>
            <Navbar />
            <Helmet>
                <title>Project 1</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center">

                <div key={project.id} className="bg-[#BABFBF] dark:bg-[#1C1D24] md:p-10 p-0 m-5 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
                    <img className="md:w-[500px] md:h-[300px] w-[290px] h-[160px] rounded-md mb-3 mt-5" src={project.image} alt="" />
                    <h1 className="text-center display-font md:text-2xl text-xl md:mx-0 mx-5 font-semibold border-b border-[#1C1D24] dark:border-[#BABFBF]">{project.title}</h1>
                    <span className="text-2xl md:text-3xl flex flex-row gap-3 flex-wrap items-center justify-center">{project.tags}</span>
                    <p> <Button><a href={project.link} target="_blank" rel="noopener noreferrer"> Repository</a></Button> <Button><a href={project.demo} target="_blank" rel="noopener noreferrer"> Demo</a></Button></p>
                    <p className="text-justify md:p-0 p-5">{project.description}</p>
                    <Link to='/'> <Button className="md:m-0 mb-5"> Back </Button> </Link>
                </div>
            </div>
        </>

    )
}
