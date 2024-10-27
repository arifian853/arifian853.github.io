import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import { SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn, SiTailwindcss, SiMongodb, SiExpress, SiRedux } from "react-icons/si";
import { Button } from "@/components/ui/button";

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

export const Project = () => {
  return (
    <div className="bg-[#E0E0E0] dark:bg-[#30323D] flex md:flex-row flex-col items-center justify-center md:h-screen h-auto p-5 gap-4" id="aboutself">
      {
        featured_projects.map((project => (
          <Card key={project.id} className="w-[350px] bg-[#BABFBF] dark:bg-[#1C1D24]">
            <CardHeader>
              <CardTitle className="display-font truncate"><Link to={`/project/${project.id}`}>{project.title}</Link></CardTitle>
              <CardDescription className="truncate">{project.description}</CardDescription>
              <Link to={`/project/${project.id}`}><p className="underline">Detail</p></Link>
            </CardHeader>
            <CardContent>
              <img className="w-[300px] h-[170px] rounded-md" src={project.image} alt="" />
            </CardContent>
            <CardFooter>
              <p className="flex justify-center items-center gap-3 w-full"> <Button><a href={project.link} target="_blank" rel="noopener noreferrer"> Repository</a></Button> <Button><a href={project.demo} target="_blank" rel="noopener noreferrer"> Demo</a></Button></p>
            </CardFooter>
            <span className="text-xl flex flex-row gap-3 flex-wrap items-center justify-center mb-5">{project.tags}</span>
          </Card>
        )))
      }


    </div>
  )
}
