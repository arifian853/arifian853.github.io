import { Helmet } from "react-helmet"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn, SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiPytorch } from "react-icons/si";

import Markdown from 'react-markdown'

const featured_projects = [
    {
        id: 1,
        title: "Rainfall Prediction with LSTM + Attention",
        description: "This project explores the use of LSTM (Long Short-Term Memory) and LSTM with an Attention Layer to predict daily rainfall rates in Batam City. The primary goal is to assess the performance difference between the two models when the Attention Layer is implemented. The study leverages the BMKG DataOnline climate dataset and aims to improve prediction accuracy, especially in the context of dynamic and extreme weather changes. Below is the abstract and the results of the study: \n \n The rainy season in Batam City significantly impacts various aspects of life, such as agriculture, food security, and clean water availability. Therefore, it is crucial to accurately predict rainfall patterns, especially in the face of increasingly dynamic and extreme weather changes. This study aims to determine whether the Attention Mechanism layer in the Long Short-Term Memory (LSTM) algorithm can improve the accuracy of daily rainfall prediction using a web application. LSTM with the Attention Mechanism layer is a regular LSTM algorithm enhanced with an additional Attention layer to observe input variations and give special attention to specific inputs. The study results show that the LSTM model with the additional Attention layer produces the best predictions and competitive error metrics compared to the LSTM model without Attention. The best results show a variability value (**R²** of **0.2986** compared to the regular LSTM with a value of **0.2580**), an **MSE** value of **0.0091** compared to the regular LSTM with a value of **0.0097**, an **RMSE** value of **0.0957** compared to the regular LSTM with a value of **0.0985**, and an **MAE** value slightly below the regular LSTM with a value of **0.0528** compared to **0.0516** for the regular LSTM. The percentage increase in accuracy based on variability is that the LSTM model with Attention achieves an improvement of **15.74%**, based on **MSE**, it improves by **6.19%**, based on **RMSE**, it improves by **2.84%**, and according to **MAE**, it decreases by **2.33%**, indicating that **MAE** is not too suitable for the LSTM with Attention model. The conclusion is that the LSTM model with Attention provides a significant increase in accuracy for rainfall prediction in Batam City.",
        image: "/project1.png",
        link: "https://github.com/arifian853/rainfall-predict-lstm-attention",
        demo: "https://colab.research.google.com/drive/19z8MfcXmCLceR8rKIeCDZSHNxUnvU1oH?usp=sharing",
        tags: [<FaPython />, <FaReact />, <SiTailwindcss />, <SiJupyter />, <SiFlask />, <SiTensorflow />, <SiKeras />, <SiScikitlearn />]
    },
    {
        id: 2,
        title: "InfiniteTalk: A place for Mentors and Mentee connect and grow!",
        description: "A place for Mentors and Mentees connect and grow! This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other's posts to help or share information! This site is built with **React + Vite**, **Tailwind CSS**, and **Flowbite React** for the frontend. Global state management in this site uses **Redux** with **React Query** for database data management and **Axios** for API handling. The backend is built with **Node.js** and **Express.js**, with a security system implemented using **BCryptJS** and **JSON Web Token (JWT)**. The database used in this system is **MongoDB**.",
        image: "/project2.png",
        link: "https://github.com/arifian853/InfiniteTalk",
        demo: "/nowhere",
        tags: [<FaReact />, <SiTailwindcss />, <SiMongodb />, <SiExpress />, <FaNodeJs />, <SiRedux />]
    },
    {
        id: 3,
        title: "AI Real-Time Audio Translation",
        description: "Developing a generative AI project using AMD PC AI technologies for the international **AMD Pervasive AI Developer Contest** with **Hackster**, in collaboration with a team of IBM Academy: Advance AI mentors from Infinite Learning. Open-Source pre-trained models used in this projects are : **OpenAI Whisper** as **Automatic Speech Recognition (ASR)** Pre-trained Model, **MarianMT** as **Machine Translation (MT)** Pre-trained Model, **tacotron2-DDC** as **Text to Speech (TTS)** Pre-trained Model, and **HiFi-GAN** as **vocoder** Model. Device used in this development is: Minisforum Venus UM790 Pro with AMD Ryzen™ 9 with Ryzen 9 7940HS as a hardware sponsorship.",
        image: "/project3.png",
        link: "https://github.com/arifian853/realtime-audio-translation",
        demo: "https://www.hackster.io/arifian-saputra/ai-real-time-audio-translation-dcb020",
        tags: [<FaReact />, <SiTailwindcss />, <SiFlask />, <SiPytorch />]
    },
]


export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const project = featured_projects.find((project) => project.id.toString() === id);

    const navigate = useNavigate();
    if (!project) {
        return <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-screen flex justify-center items-center p-5">
            <Helmet>
                <title>Project Not Found</title>
            </Helmet>
            <div data-aos="zoom-out" data-aos-duration='500' className="w-10/12 md:w-96 bg-[#BABFBF] dark:bg-[#1C1D24] shadow-lg p-5 flex justify-center items-center flex-col gap-4 rounded-md">
                <h1 className="display-font font-semibold text-xl"><span className="text-red-500">404</span> | Project not found</h1>

                <Button className="display-font font-semibold w-24" onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>

        </div>;
    }
    return (
        <>
            <Navbar />
            <Helmet>
                <title>{project.title} | Arifian Saputra</title>
                <meta name="description" content={project.description.slice(0, 155)} />
            </Helmet>
            <div data-aos="fade-out" data-aos-duration='800' className="flex flex-col items-center justify-center">

                <div key={project.id} className="bg-[#BABFBF] dark:bg-[#1C1D24] md:p-10 p-0 m-5 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
                    <img loading="lazy" className="md:w-[560px] md:h-[300px] w-[290px] h-[160px] rounded-md mb-3 mt-5" src={project.image} alt="" />
                    <h1 className="text-center display-font md:text-2xl text-xl md:mx-0 mx-5 font-semibold border-b border-[#1C1D24] dark:border-[#BABFBF]">{project.title}</h1>
                    <span className="text-2xl md:text-3xl flex flex-row gap-3 flex-wrap items-center justify-center">{project.tags}</span>
                    <p> <Button><a href={project.link} target="_blank" rel="noopener noreferrer"> Repository</a></Button> <Button><a href={project.demo} target="_blank" rel="noopener noreferrer"> Demo</a></Button></p>
                    <p className="text-justify md:p-0 p-5"><Markdown>{project.description}</Markdown></p>
                    <Link to='/'> <Button className="md:m-0 mb-5"> Back </Button> </Link>
                </div>
            </div>
        </>

    )
}
