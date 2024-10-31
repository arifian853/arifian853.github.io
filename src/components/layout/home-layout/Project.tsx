import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn, SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiPytorch, SiGooglegemini } from "react-icons/si";
import { Button } from "@/components/ui/button";

import { HiOutlineExternalLink } from "react-icons/hi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  demo: string;
  tags: string[];
}

const featured_projects = [
  {
    id: 1,
    title: "Rainfall Prediction with LSTM + Attention",
    description: "This project explores the use of LSTM (Long Short-Term Memory) and LSTM with an Attention Layer to predict daily rainfall rates in Batam City. The primary goal is to assess the performance difference between the two models when the Attention Layer is implemented. The study leverages the BMKG DataOnline climate dataset and aims to improve prediction accuracy, especially in the context of dynamic and extreme weather changes. Below is the abstract and the results of the study: \n \n The rainy season in Batam City significantly impacts various aspects of life, such as agriculture, food security, and clean water availability. Therefore, it is crucial to accurately predict rainfall patterns, especially in the face of increasingly dynamic and extreme weather changes. This study aims to determine whether the Attention Mechanism layer in the Long Short-Term Memory (LSTM) algorithm can improve the accuracy of daily rainfall prediction using a web application. LSTM with the Attention Mechanism layer is a regular LSTM algorithm enhanced with an additional Attention layer to observe input variations and give special attention to specific inputs. The study results show that the LSTM model with the additional Attention layer produces the best predictions and competitive error metrics compared to the LSTM model without Attention. The best results show a variability value (**R²** of **0.2986** compared to the regular LSTM with a value of **0.2580**), an **MSE** value of **0.0091** compared to the regular LSTM with a value of **0.0097**, an **RMSE** value of **0.0957** compared to the regular LSTM with a value of **0.0985**, and an **MAE** value slightly below the regular LSTM with a value of **0.0528** compared to **0.0516** for the regular LSTM. The percentage increase in accuracy based on variability is that the LSTM model with Attention achieves an improvement of **15.74%**, based on **MSE**, it improves by **6.19%**, based on **RMSE**, it improves by **2.84%**, and according to **MAE**, it decreases by **2.33%**, indicating that **MAE** is not too suitable for the LSTM with Attention model. The conclusion is that the LSTM model with Attention provides a significant increase in accuracy for rainfall prediction in Batam City.",
    image: "/project1.png",
    link: "https://github.com/arifian853/rainfall-predict-lstm-attention",
    demo: "https://colab.research.google.com/drive/19z8MfcXmCLceR8rKIeCDZSHNxUnvU1oH?usp=sharing",
    tags: [
      { icon: <FaPython />, name: "Python" },
      { icon: <SiJupyter />, name: "Jupyter" },
      { icon: <SiTensorflow />, name: "TensorFlow" },
      { icon: <SiKeras />, name: "Keras" },
      { icon: <SiScikitlearn />, name: "Scikit-learn" },
      { icon: <SiFlask />, name: "Flask" },
    ]
  },
  {
    id: 2,
    title: "InfiniteTalk: A place for Mentors and Mentee connect and grow!",
    description: "A place for Mentors and Mentees connect and grow! This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other's posts to help or share information! This site is built with **React + Vite**, **Tailwind CSS**, and **Flowbite React** for the frontend. Global state management in this site uses **Redux** with **React Query** for database data management and **Axios** for API handling. The backend is built with **Node.js** and **Express.js**, with a security system implemented using **BCryptJS** and **JSON Web Token (JWT)**. The database used in this system is **MongoDB**.",
    image: "/project2.png",
    link: "https://github.com/arifian853/InfiniteTalk",
    demo: "/nowhere",
    tags: [
      { icon: <FaReact />, name: "React" },
      { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <SiExpress />, name: "Express.js" },
      { icon: <FaNodeJs />, name: "Node.js" },
      { icon: <SiRedux />, name: "Redux" }
    ]
  },
  {
    id: 3,
    title: "AI Real-Time Audio Translation",
    description: "Developing a generative AI project using AMD PC AI technologies for the international **AMD Pervasive AI Developer Contest** with **Hackster**, in collaboration with a team of IBM Academy: Advance AI mentors from Infinite Learning. Open-Source pre-trained models used in this projects are : **OpenAI Whisper** as **Automatic Speech Recognition (ASR)** Pre-trained Model, **MarianMT** as **Machine Translation (MT)** Pre-trained Model, **tacotron2-DDC** as **Text to Speech (TTS)** Pre-trained Model, and **HiFi-GAN** as **vocoder** Model. Device used in this development is: Minisforum Venus UM790 Pro with AMD Ryzen™ 9 with Ryzen 9 7940HS as a hardware sponsorship.",
    image: "/project3.png",
    link: "https://github.com/arifian853/realtime-audio-translation",
    demo: "https://www.hackster.io/arifian-saputra/ai-real-time-audio-translation-dcb020",
    tags: [
      { icon: <FaReact />, name: "React" },
      { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <SiFlask />, name: "Flask" },
      { icon: <SiPytorch />, name: "PyTorch" }
    ]
  },
  {
    id: 4,
    title: "Simple AI Chat with Google Generative Language API (Gemini API)",
    description: "Just a simple chatbot (without history) for asking anything to **Google Gemini** model with **Google Generative Language API (Gemini API)** from Google AI Studio. This site is protected by Vercel Security Checkpoint for security.",
    image: "/project4.png",
    link: "https://github.com/arifian853/simple-ai-chat",
    demo: "https://ai-chat-lite.vercel.app/",
    tags: [
      { icon: <FaReact />, name: "React" },
      { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <SiGooglegemini />, name: "Google Gemini API" }
    ]
  }

]

export const Project = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#E0E0E0] dark:bg-[#30323D] flex md:flex-row flex-col items-center justify-center min-h-screen h-auto p-5 gap-5 md:w-4/5 w-full flex-wrap" id="aboutself">
        {
          featured_projects.map((project => (
            <Card data-aos="fade-out" data-aos-duration='800' key={project.id} className="md:w-[350px] w-[330px] bg-[#BABFBF] dark:bg-[#1C1D24]">
              <CardHeader>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CardTitle className="display-font truncate hover:underline"><Link to={`/project/${project.id}`}>{project.title}</Link></CardTitle>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CardDescription className="truncate">{project.description}</CardDescription>
                <Link to={`/project/${project.id}`}><p className="underline">Detail</p></Link>
              </CardHeader>
              <CardContent>
                <img className="w-[300px] h-[170px] rounded-md" src={project.image} alt="" />
              </CardContent>
              <CardFooter>
                <p className="flex justify-center items-center gap-3 w-full"> <Button><a className="flex flex-row justify-center items-center gap-1" href={project.link} target="_blank" rel="noopener noreferrer"> Repository <HiOutlineExternalLink /> </a></Button> <Button><a className="flex flex-row justify-center items-center gap-1" href={project.demo} target="_blank" rel="noopener noreferrer"> Demo <HiOutlineExternalLink /></a></Button></p>
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
  )
}