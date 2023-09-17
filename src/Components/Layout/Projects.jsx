import React from 'react'
import { IoLogoHtml5, IoLogoCss3, IoLogoWordpress, IoLogoNodejs } from 'react-icons/io'
import { SiBootstrap, SiMongodb, SiExpress, SiJavascript, SiFirebase, SiCsharp, SiFlask, SiWebpack, SiFlutter, SiDart } from 'react-icons/si'
import { FaArrowRight, FaReact, FaUnity, FaWindows } from 'react-icons/fa'
import { DiAndroid } from 'react-icons/di'
import { Carousel } from 'flowbite-react'

export const Projects = () => {

  const featuredProj = [
    {
      name: "RhythmPlayer Music App",
      year: "2023",
      description: "Simple app for playing music with RxDart made with Flutter",
      stacks: <> <SiFlutter /> <SiDart /> </>,
      img_url: "/img/rhythmplayer.png",
      repo: <a href='https://github.com/arifian853/RhythmPlayer' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://drive.google.com/file/d/1uJt_jfDJ8cc9hdlqCRH9p-BdkmxtSL9c/view?usp=sharing' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo2 flex justify-center items-center gap-2'> Download <DiAndroid /> </button>  </a>,
      id: "007"
    },
    {
      name: "Herbal.in",
      year: "2022",
      description: "Web-based app for buying a herbal medicine online with Google Pay payment gateway.",
      stacks: <> <FaReact /> <SiFirebase /> </>,
      img_url: "/img/herbalin.png",
      repo: <a href='https://github.com/arifian853/Herbal.in' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='http://herbal-in.vercel.app' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button>  </a>,
      id: "005"
    },
    {
      name: "Desa Wisata Pengudang",
      year: "2022",
      description: "Web for Pengudang Tourism Village, focusing on how tourist can know more about Pengudang.",
      stacks: <> <IoLogoWordpress /> </>,
      img_url: "/img/pengudang.png",
      repo: "",
      demo: <a href='https://pengudangbintanmangrove.id/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button>  </a>,
      id: "004"
    },
    {
      name: "MakanCuy App",
      year: "2022",
      description: "Restaurant Catalogue Progressive Web App (PWA) named MakanCuy. Made with webpack environment.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /> <SiWebpack /> </>,
      img_url: "/img/makancuy.png",
      repo: <a href='https://github.com/arifian853/pwa-restaurant-catalog' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://makancuy-finals.netlify.app/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button>  </a>,
      id: "003"
    },
    {
      name: "Bring Back The Nature",
      year: "2022",
      description: "Simple survival game made with Unity3D Engine.",
      stacks: <> <FaUnity /> <SiCsharp /> </>,
      img_url: "/img/bbtn.png",
      repo: <a href='https://github.com/arifian853/BringBackTheNature' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://drive.google.com/drive/u/2/folders/1P0Cy4KdjiF9cXpwTo05E8zn5nzsbrB8m' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo2 flex justify-center items-center gap-2'> Download <FaWindows /> </button>  </a>,
      id: "002"
    },
    {
      name: "#PeduliCOVID-19",
      year: "2021",
      description: "Site about COVID-19 Global Pandemic informations, world pandemic history, and the New Normal.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /> </>,
      img_url: "/img/pedulicovid19.png",
      repo: <a href='https://github.com/arifian853/pedulicovid-19' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://arifian853.github.io/pedulicovid-19/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo flex justify-center items-center gap-2'> Demo </button>  </a>,
      id: "001"
    },

  ]

  const anotherProj = [
    {
      name: "#PeduliCOVID-19",
      year: "2021",
      description: "Site about COVID-19 Global Pandemic informations, world pandemic history, hygiene suggestion and the New Normal information. But with Flask back-end.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /> <SiFlask /> </>,
      repo: <a href='https://github.com/arifian853/pedulicovid-19-flask' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: "",
      id: "001"
    },
    {
      name: "MovieInfo.com",
      year: "2021",
      description: "This site contains movie lists from The Movie Database (TMDB) API.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /> </>,
      repo: <a href='https://github.com/arifian853/GDSC-movie-info' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://arifian853.github.io/GDSC-movie-info/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "002"
    },
    {
      name: "Simple Weather App",
      year: "2021",
      description: "A simple weather forecast app made with React JS and API integrating",
      stacks: <> <FaReact /> <SiBootstrap /> </>,
      repo: <a href='https://github.com/arifian853/simple-weather-app' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://arifian853.github.io/simple-weather-app/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "003"
    },
    {
      name: "Software Development Project (API-RMU)",
      year: "2022",
      description: "API for Room Usage Monitoring app at Faculty of Engineering, for giving data to Web and Android App.",
      stacks: <> <SiMongodb /> < SiExpress /> <IoLogoNodejs /> </>,
      repo: <a href='https://gitlab.com/tekad-matulatan/api-rmu' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: "",
      id: "004"
    },
    {
      name: "LoginAuth (Edge />)",
      year: "2022",
      description: "React App frontend for registering an account and login an account. (API not deployed)",
      stacks: <> <SiMongodb /> < SiExpress /> <FaReact /> <IoLogoNodejs /> </>,
      repo: <a href='https://github.com/arifian853/loginAuth-frontend' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo (FE)</button> </a>,
      demo: <a href='https://arifian853.github.io/loginAuth-frontend-build/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "005"
    },
    {
      name: "Bookshelf App",
      year: "2022",
      description: "Simple Bookshelf App with HTML,CSS,JavaScript with localStorage functionality and DOM manipulation.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /></>,
      repo: <a href='https://github.com/arifian853/bookshelf-app-js' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo </button> </a>,
      demo: <a href='https://arifian853.github.io/bookshelf-app-js/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "006"
    },
    {
      name: "CariFilm",
      year: "2022",
      description: "Web for searching film titles with TMDB API and Webpack Environment.",
      stacks: <> <IoLogoHtml5 /> <IoLogoCss3 /> <SiJavascript /> <SiWebpack /> </>,
      repo: <a href='https://github.com/arifian853/CariFilm-Webpack' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo</button> </a>,
      demo: <a href='https://arifian853.github.io/CariFilm/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "007"
    },
    {
      name: "My Notes",
      year: "2022",
      description: "Simple Notes app using State & Props",
      stacks: <> <FaReact /> </>,
      repo: <a href='https://github.com/arifian853/my-notes-react' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Repo</button> </a>,
      demo: <a href='https://my-notes-react.vercel.app/' target='_blank' rel='noopener noreferrer'> <button className='btn-repo-demo'> Demo </button> </a>,
      id: "007"
    },
  ]

  return (
    <div className='project-container' id='light'>
      <div className="proj-title">
        <h1 className='gradient-title text-5xl p-1'> Projects</h1>
      </div>
      <div className="proj-point-container md:h-screen ">
        <div className="proj-title">
          <h1 className='gradient-title text-2xl p-1'> Featured </h1>
        </div>
        <Carousel data-aos="zoom-in" data-aos-duration="1000" slideInterval={3500} className='h-screen md:w-3/4'>
          {
            featuredProj.map((featured => (
              <div className='featured-project-point shadow-lg' key={featured.id}>
                <div className="name-stack"><h6 className='font-bold text-sm md:text-3xl flex flex-wrap'>{featured.name} ({featured.year})</h6> <p className='text-sm md:text-3xl flex gap-2'>{featured.stacks}</p> </div>
                <br />
                <div className="proj-info">
                  <div className="info-left">
                    <img className='featured-proj-img' src={featured.img_url} alt={featured.name} />
                  </div>
                  <div className="info-right">
                    <p className='text-sm'>{featured.description}</p>
                    <div className="mt-3 flex align-middle gap-3 justify-center text-sm"> {featured.repo} {featured.demo} </div>
                  </div>
                </div>
              </div>
            )))
          }
        </Carousel>
      </div>
      <div className="proj-point-container">
        <div className="proj-title">
          <h1 className='gradient-title text-2xl p-1'> Another Project </h1>
        </div>
        <div className="proj-point-container2">
          {
            anotherProj.map((another => (
              <div data-aos="zoom-in" data-aos-duration="1000" className='featured-project-point2 shadow-lg' key={another.id}>
                <div className="name-stack2"><h1 className='text-1xl'>{another.name} <br /> ({another.year})</h1> </div>
                <hr className='hr-bold' />
                <div className="proj-info2">
                  <p className='desc-another text-sm'>{another.description}</p>
                  <div className="flex align-middle gap-3 justify-center text-sm"> {another.repo} {another.demo} </div>
                </div>
                <hr className='hr-bold' />
                <p className='text-2xl flex justify-center gap-2'>{another.stacks}</p>
              </div>
            )))
          }

        </div>
        <br />
        <a href="https://github.com/arifian853" target='_blank' rel='noopener noreferrer'><button className='btn-proj'>All projects on GitHub <FaArrowRight /> </button></a>
        <br />
      </div>
    </div>
  )
}
