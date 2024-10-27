import { Helmet } from "react-helmet"
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
  

export const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const project = featured_projects.find((project) => project.id.toString() === id);
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <>
            <Helmet>
                <title>Project 1</title>
            </Helmet>
            <div>ProjectPage</div>
            <Card key={project.id} className="w-[350px] bg-[#BABFBF] dark:bg-[#1C1D24]">
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={project.image} alt="" />
                </CardContent>
                <CardFooter>
                    <p>{project.link} | {project.demo}</p> <br /> {project.tags}
                </CardFooter>
            </Card>
        </>

    )
}
