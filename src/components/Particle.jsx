import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export const Particle = (props) => {
  const { theme } = props;
  let optionsVariable = '';
  
  if(theme === "dark") {
    optionsVariable =  {
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
          enable: true,
          zIndex: 1
      },
      fpsLimit:120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#ECECEC',
        },
        links: {
          color: "#ECECEC",
          distance: 120,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "triangle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }
  } if(theme === "light") {
     optionsVariable =  {
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
          enable: true,
          zIndex: 1
      },
      fpsLimit:120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#222831',
        },
        links: {
          color: "#222831",
          distance: 120,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "polygon",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }
  }
    
    const particlesInit = async (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };
    
  return (
    <Particles id='tsparticles' init={particlesInit} Loaded={particlesLoaded} 
    options={
        optionsVariable
    }/>

    
  )
}