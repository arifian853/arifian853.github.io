import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";

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
    title: "Project 1",
    description: "This is a description of project 1",
    image: "https://picsum.photos/200/300",
    link: "https://example.com/project1",
    demo: "https://google.com",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    title: "Project 2",
    description: "This is a description of project 1",
    image: "https://picsum.photos/200/300",
    link: "https://example.com/project1",
    demo: "https://google.com",
    tags: ["tag1", "tag2"],
  }
]

export const Project = () => {
  return (
    <div className="bg-[#E0E0E0] dark:bg-[#30323D] flex md:flex-row flex-col items-center justify-center md:h-screen h-auto p-5" id="aboutself">
      {
        featured_projects.map((project => (
          <Card key={project.id} className="w-[350px] bg-[#BABFBF] dark:bg-[#1C1D24]">
            <CardHeader>
              <CardTitle><Link to={`/project/${project.id}`}>{project.title}</Link></CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={project.image} alt="" />
            </CardContent>
            <CardFooter>
              <p>{project.link} | {project.demo}</p> <br /> {project.tags}
            </CardFooter>
          </Card>
        )))
      }


    </div>
  )
}
