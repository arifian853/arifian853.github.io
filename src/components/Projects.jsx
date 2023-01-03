import React from 'react';
import ProjectsData from '../ProjectsData';
// import { SiBootstrap, SiCss3, SiHtml5, SiJavascript, SiNodedotjs, SiReact, SiTailwindcss } from 'react-icons/si';
import { BiLinkExternal } from 'react-icons/bi';



const Projects = () => {
  return (
    <div className="projects-parent">
        <h1 className="text-4xl">Projects</h1>
        <br />
        <div className="container-projects">
        {
            ProjectsData.map((project) => (
                <div key={project.name} className="projects-item"> 
                    <img className="projects-img" src={project.image} alt={project.name} />
                    <div className="projects-desc">
                        <h1 className="text-xl"><b>{project.name}</b></h1>
                        <p className='descriptions'>{project.description}</p>
                        <div className='flex items-center py-1 justify-center gap-4'>
                        <a className='projects-links' href={project.visit} target="_blank" rel="noreferrer noopener">Visit<BiLinkExternal /></a> 
                        <a className='projects-links' href={project.repo} target="_blank" rel="noreferrer noopener">Repository<BiLinkExternal /></a>
                    </div>
                    </div>
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default Projects