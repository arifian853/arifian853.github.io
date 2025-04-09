import { Helmet } from "react-helmet"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn, SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiPytorch, SiGooglegemini, SiDart, SiFlutter, SiFirebase, SiWordpress, SiHtml5, SiCss3, SiJavascript, SiWebpack, SiUnity, SiCsharp } from "react-icons/si";

import Markdown from 'react-markdown'
import { HiOutlineExternalLink } from "react-icons/hi";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaArrowLeft } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectPage {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    demo: string;
    tags: string[];
}

// Featured projects data remains unchanged
const featured_projects = [
    {
        "id": 0,
        "title": "Arifian.AI",
        "year": "2025",
        "description": "Arifian.ai is a personalized my-own-AI-persona chatbot designed to answer general or public questions about myself. Made from Google T5-small and USE Feature Extraction. Hosted as a Spaces to serve API backend functionality in HuggingFace Spaces.",
        "image": "/project0.jpg",
        "link": [
            { "repo_link": "https://github.com/arifian853/arifian.ai", "btn_name": "Repo" }
        ],
        "demo": [
            { "demo_link": "https://arifian853.vercel.app/chat-ai", "btn_name": "Demo" }
        ],
        "tags": [
            { "icon": <FaPython />, "name": "Python" },
            { "icon": <SiTensorflow />, "name": "TensorFlow" },
            { "icon": <SiFlask />, "name": "Flask" },
            { "icon": <SiPytorch />, "name": "PyTorch" }
        ]
    },
    {
        "id": 1,
        "title": "Rainfall Prediction with LSTM + Attention",
        "year": "2024",
        "description": "This project explores the use of LSTM (Long Short-Term Memory) and LSTM with an Attention Layer to predict daily rainfall rates in Batam City. The primary goal is to assess the performance difference between the two models when the Attention Layer is implemented. The study leverages the BMKG DataOnline climate dataset and aims to improve prediction accuracy, especially in the context of dynamic and extreme weather changes. Below is the abstract and the results of the study: \n \n The rainy season in Batam City significantly impacts various aspects of life, such as agriculture, food security, and clean water availability. Therefore, it is crucial to accurately predict rainfall patterns, especially in the face of increasingly dynamic and extreme weather changes. This study aims to determine whether the Attention Mechanism layer in the Long Short-Term Memory (LSTM) algorithm can improve the accuracy of daily rainfall prediction using a web application. LSTM with the Attention Mechanism layer is a regular LSTM algorithm enhanced with an additional Attention layer to observe input variations and give special attention to specific inputs. The study results show that the LSTM model with the additional Attention layer produces the best predictions and competitive error metrics compared to the LSTM model without Attention. The best results show a variability value (**R²** of **0.2986** compared to the regular LSTM with a value of **0.2580**), an **MSE** value of **0.0091** compared to the regular LSTM with a value of **0.0097**, an **RMSE** value of **0.0957** compared to the regular LSTM with a value of **0.0985**, and an **MAE** value slightly below the regular LSTM with a value of **0.0528** compared to **0.0516** for the regular LSTM. The percentage increase in accuracy based on variability is that the LSTM model with Attention achieves an improvement of **15.74%**, based on **MSE**, it improves by **6.19%**, based on **RMSE**, it improves by **2.84%**, and according to **MAE**, it decreases by **2.33%**, indicating that **MAE** is not too suitable for the LSTM with Attention model. The conclusion is that the LSTM model with Attention provides a significant increase in accuracy for rainfall prediction in Batam City.",
        "image": "/project1.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/rainfall-predict-lstm-attention", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://colab.research.google.com/drive/19z8MfcXmCLceR8rKIeCDZSHNxUnvU1oH?usp=sharing", "btn_name": "Notebook" }
        ],
        "tags": [
            { "icon": <FaPython />, "name": "Python" },
            { "icon": <SiJupyter />, "name": "Jupyter" },
            { "icon": <SiTensorflow />, "name": "TensorFlow" },
            { "icon": <SiKeras />, "name": "Keras" },
            { "icon": <SiScikitlearn />, "name": "Scikit-learn" },
            { "icon": <SiFlask />, "name": "Flask" }
        ]
    },
    {
        "id": 2,
        "title": "AI Real-Time Audio Translation",
        "year": "2024",
        "description": "Developing a generative AI project using AMD PC AI technologies for the international **AMD Pervasive AI Developer Contest** with **Hackster**, in collaboration with a team of IBM Academy: Advance AI mentors from Infinite Learning. Open-Source pre-trained models used in this projects are : **OpenAI Whisper** as **Automatic Speech Recognition (ASR)** Pre-trained Model, **MarianMT** as **Machine Translation (MT)** Pre-trained Model, **tacotron2-DDC** as **Text to Speech (TTS)** Pre-trained Model, and **HiFi-GAN** as **vocoder** Model. Device used in this development is: Minisforum Venus UM790 Pro with AMD Ryzen™ 9 with Ryzen 9 7940HS as a hardware sponsorship.",
        "image": "/project3.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/realtime-audio-translation", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://www.hackster.io/arifian-saputra/ai-real-time-audio-translation-dcb020", "btn_name": "Submission" }
        ],
        "tags": [
            { "icon": <FaReact />, "name": "React" },
            { "icon": <SiTailwindcss />, "name": "Tailwind CSS" },
            { "icon": <SiFlask />, "name": "Flask" },
            { "icon": <SiPytorch />, "name": "PyTorch" }
        ]
    },
    {
        "id": 3,
        "title": "Simple AI Chat with Google Generative Language API (Gemini API)",
        "year": "2024",
        "description": "Just a simple chatbot (without history) for asking anything to **Google Gemini** model (Gemini 1.5 Flash 002) with **Google Generative Language API (Gemini API)** from Google AI Studio. This site is protected by Vercel Security Checkpoint for security.",
        "image": "/project4.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/simple-ai-chat", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://ai-chat-lite.vercel.app/", "btn_name": "Live Demo" }
        ],
        "tags": [
            { "icon": <FaReact />, "name": "React" },
            { "icon": <SiTailwindcss />, "name": "Tailwind CSS" },
            { "icon": <SiGooglegemini />, "name": "Google Gemini API" }
        ]
    },
    {
        "id": 4,
        "title": "InfiniteTalk: A place for Mentors and Mentee connect and grow!",
        "year": "2023",
        "description": "A place for Mentors and Mentees connect and grow! This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other's posts to help or share information! This site is built with **React + Vite**, **Tailwind CSS**, and **Flowbite React** for the frontend. Global state management in this site uses **Redux** with **React Query** for database data management and **Axios** for API handling. The backend is built with **Node.js** and **Express.js**, with a security system implemented using **BCryptJS** and **JSON Web Token (JWT)**. The database used in this system is **MongoDB**.",
        "image": "/project2.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/InfiniteTalk", "btn_name": "Repository" }
        ],
        "demo": [],
        "tags": [
            { "icon": <FaReact />, "name": "React" },
            { "icon": <SiTailwindcss />, "name": "Tailwind CSS" },
            { "icon": <SiMongodb />, "name": "MongoDB" },
            { "icon": <SiExpress />, "name": "Express.js" },
            { "icon": <FaNodeJs />, "name": "Node.js" },
            { "icon": <SiRedux />, "name": "Redux" }
        ]
    },
    {
        "id": 5,
        "title": "RhythmPlayer Music App: Music Player",
        "year": "2023",
        "description": "Simple Android app for playing music made with **Flutter** and **Dart.** This project is made for **Mobile Programming** subject in college back in 6th semester at 2023.",
        "image": "/project5.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/RhythmPlayer", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://drive.google.com/file/d/1uJt_jfDJ8cc9hdlqCRH9p-BdkmxtSL9c/view", "btn_name": "APK Download" }
        ],
        "tags": [
            { "icon": <SiFlutter />, "name": "Flutter" },
            { "icon": <SiDart />, "name": "Dart" }
        ]
    },
    {
        "id": 6,
        "title": "Herbal.in",
        "year": "2022",
        "description": "Web-based app to buy herbal medicines with Google Pay gateway payment. Made with **Create React App (CRA)** and **Google Firebase** authentication. The project was for capstone project on Frontend and React Developer Dicoding X MSIB back in 2022.",
        "image": "/project6.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/Herbal.in", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://herbal-in.vercel.app/", "btn_name": "Live Demo" }
        ],
        "tags": [
            { "icon": <FaReact />, "name": "React" },
            { "icon": <SiFirebase />, "name": "Firebase" }
        ]
    },
    {
        "id": 7,
        "title": "Desa Wisata Pengudang Website",
        "year": "2022",
        "description": "Web for **Pengudang Tourism Village.** Focusing on how tourist can know more about Pengudang Village. The site is made with **WordPress** and a project for **KOSABANGSA** back in 2022 for promoting Pengudang Tourism Village.",
        "image": "/project7.png",
        "link": [],
        "demo": [
            { "demo_link": "https://pengudangbintanmangrove.id/", "btn_name": "Demo (No longer live)" }
        ],
        "tags": [
            { "icon": <SiWordpress />, "name": "WordPress" },
        ]
    },
    {
        "id": 8,
        "title": "MakanCuy App (PWA)",
        "year": "2022",
        "description": "Restaurant Catalogue named MakanCuy made with **Progressive Web App (PWA)** with **WebPack** environment. The project was for Front-End Developer Expert module on Frontend and React Developer Dicoding X MSIB back in 2022.",
        "image": "/project8.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/pwa-restaurant-catalog", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://makancuy-finals.netlify.app/", "btn_name": "Live Demo" }
        ],
        "tags": [
            { "icon": <SiHtml5 />, "name": "HTML" },
            { "icon": <SiCss3 />, "name": "CSS" },
            { "icon": <SiJavascript />, "name": "JavaScript" },
            { "icon": <SiWebpack />, "name": "WebPack" }
        ]
    },
    {
        "id": 9,
        "title": "Bring Back The Nature",
        "year": "2022",
        "description": "Simple survival 3D game made with **Unity** and **C#.** This game was a project of Computer Graphics subject at college when at 4th semester back in 2022 as a final project. The game has a simple mechanic for the player to **collect 5 seeds** to open the portal in the middle of the corrupted island with a lot of obstacles, then win after goes to the portal.",
        "image": "/project9.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/BringBackTheNature", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://drive.google.com/drive/u/2/folders/1P0Cy4KdjiF9cXpwTo05E8zn5nzsbrB8m", "btn_name": "Download" }
        ],
        "tags": [
            { "icon": <SiUnity />, "name": "Unity" },
            { "icon": <SiCsharp />, "name": "C# (C-Sharp)" },
        ]
    },
    {
        "id": 10,
        "title": "#PeduliCOVID-19",
        "year": "2021",
        "description": "Peduli COVID-19 is a website that contains information about **COVID-19 (Corona Virus Disease 2019) global pandemic**. Starting from the history of pandemics in the world, health information, health protocols to avoid the COVID-19 virus, preparations for the new normal and what people can do to stop the spread of the COVID-19 virus. This website is also responsive and can be accessed from desktop or android.",
        "image": "/project10.png",
        "link": [
            { "repo_link": "https://github.com/arifian853/pedulicovid-19", "btn_name": "Repository" }
        ],
        "demo": [
            { "demo_link": "https://arifian853.github.io/pedulicovid-19/", "btn_name": "Live Demo" }
        ],
        "tags": [
            { "icon": <SiHtml5 />, "name": "HTML" },
            { "icon": <SiCss3 />, "name": "CSS" },
            { "icon": <SiJavascript />, "name": "JavaScript" },
        ]
    },
]

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const project = featured_projects.find((project) => project.id.toString() === id);
    const navigate = useNavigate();

    if (!project) {
        return <div className="bg-[#E0E0E0] dark:bg-[#121212] h-screen flex justify-center items-center p-5">
            <Helmet>
                <title>Arifian Saputra - Not Found</title>
            </Helmet>
            <div data-aos="zoom-out" data-aos-duration='600' className="w-11/12 md:w-96 bg-[#EFEFEF] dark:bg-[#1C1C1C] shadow-lg p-5 flex justify-center items-center flex-col gap-4 rounded-md">
                <h1 className="display-font font-semibold text-xl"><span className="text-red-500">404</span> | Project not found</h1>

                <Button onClick={() => navigate(-1)} className="flex flex-row justify-center items-center gap-1">
                    <FaArrowLeft /> Go Back
                </Button>
            </div>

        </div>
    }

    return (
        <>
            <Navbar />
            <Helmet>
                <title>{project.title}</title>
                <meta name="description" content={project.description.slice(0, 155)} />
            </Helmet>

            <div className="flex flex-col justify-center items-center bg-[#E0E0E0] dark:bg-[#121212] py-8">
                <div data-aos="fade-out" data-aos-duration='900' className="flex flex-col items-center justify-center w-full max-w-5xl px-4">
                    <div key={project.id} className="bg-[#EFEFEF] dark:bg-[#1C1C1C] rounded-xl shadow-lg flex flex-col items-center justify-center gap-6 overflow-hidden w-full">
                        {/* Project Header with Image */}
                        <div className="w-full relative">
                            <div className="w-full h-[200px] md:h-[350px] overflow-hidden bg-gray-200 dark:bg-gray-800">
                                <img
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
                                    src={project.image}
                                    alt={project.title}
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#EFEFEF] dark:from-[#1C1C1C] h-16"></div>
                        </div>

                        <div className="px-6 md:px-10 w-full -mt-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-center md:text-left display-font text-2xl md:text-3xl font-semibold">{project.title}</h1>
                                    <p className="text-center md:text-left opacity-75 mt-1">({project.year})</p>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-end gap-2">
                                    {project.link.map((links, index) => (
                                        <Button key={index} className="transition-all hover:scale-105">
                                            <a className="flex flex-row justify-center items-center gap-1" href={links.repo_link} target="_blank" rel="noopener noreferrer">
                                                {links.btn_name} <HiOutlineExternalLink />
                                            </a>
                                        </Button>
                                    ))}
                                    {project.demo.map((links, index) => (
                                        <Button key={index} className="transition-all hover:scale-105">
                                            <a className="flex flex-row justify-center items-center gap-1" href={links.demo_link} target="_blank" rel="noopener noreferrer">
                                                {links.btn_name} <HiOutlineExternalLink />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <TooltipProvider>
                                <div className="text-2xl md:text-3xl flex flex-row gap-4 flex-wrap items-center justify-center md:justify-start mb-6 p-4 bg-[#E0E0E0] dark:bg-[#121212] rounded-lg">
                                    <span className="text-sm font-medium mr-2 opacity-75">Tech Stack:</span>
                                    {project.tags.map((tag, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger>
                                                <span className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500 transition-all duration-300 transform hover:scale-110">{tag.icon}</span>
                                            </TooltipTrigger>
                                            <TooltipContent className="flex flex-row items-center justify-center gap-2">
                                                {tag.icon} {tag.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </TooltipProvider>

                            {/* Project Description */}
                            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mb-8">
                                <Markdown className="text-justify leading-relaxed">{project.description}</Markdown>
                            </div>

                            <div className="flex justify-center md:justify-start mb-8">
                                <Button
                                    className="flex flex-row justify-center items-center gap-1 px-6 py-5 transition-all hover:scale-105"
                                    onClick={() => navigate(-1)}
                                >
                                    <FaArrowLeft className="mr-1" /> Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-6xl px-4 mt-12">
                    <div className="flex items-center justify-center"><h2 className="text-2xl font-semibold display-font text-center mb-8 pb-2 border-b border-red-500">More Projects</h2></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {featured_projects
                            .filter(p => p.id.toString() !== id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map((project => (
                                <Card data-aos="fade-out" data-aos-duration='900' key={project.id} className="md:w-[350px] w-[330px] bg-[#EFEFEF] dark:bg-[#1C1C1C] shadow-lg border-none">
                                    <CardHeader>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CardTitle className="display-font truncate hover:underline text-left"><Link to={`/project/${project.id}`}>{project.title}</Link></CardTitle>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{project.title} ({project.year})</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <CardDescription className="truncate"> ({project.year}) <br /> {project.description} </CardDescription>
                                        <Link to={`/project/${project.id}`}><p className="w-12 border-b border-red-500 opacity-75">More...</p></Link>
                                    </CardHeader>
                                    <CardContent>
                                        <Link to={`/project/${project.id}`}><img className="w-[300px] h-[170px] rounded-md hover:border-red-500 border border-white" src={project.image} alt="" /></Link>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="flex justify-center items-center gap-3 w-full">
                                            {
                                                project.link.map((links, index) => (
                                                    <Button key={index}><a className="flex flex-row justify-center items-center gap-1" href={links.repo_link} target="_blank" rel="noopener noreferrer"> {links.btn_name} <HiOutlineExternalLink /></a></Button>
                                                ))
                                            }
                                            {
                                                project.demo.map((links, index) => (
                                                    <Button key={index}><a className="flex flex-row justify-center items-center gap-1" href={links.demo_link} target="_blank" rel="noopener noreferrer"> {links.btn_name} <HiOutlineExternalLink /></a></Button>
                                                ))
                                            }
                                        </p>
                                    </CardFooter>
                                    <TooltipProvider>
                                        <div className="text-xl flex flex-row gap-3 flex-wrap items-center justify-center mb-5">
                                            {project.tags.map((tag, index) => (
                                                <Tooltip key={index}>
                                                    <TooltipTrigger>
                                                        <span className="hover:drop-shadow-[0_4px_4px_rgba(239,68,68,0.5)] hover:text-red-500">{tag.icon}</span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="flex flex-row items-center justify-center gap-2">
                                                        {tag.icon} {tag.name}
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}

                                        </div>
                                    </TooltipProvider>
                                </Card>
                            )))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}