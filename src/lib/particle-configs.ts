import type { ISourceOptions } from "tsparticles-engine";

export const getParticleConfig = (preset: "links" | "snow", isDark: boolean): ISourceOptions => {
  const tealColor = isDark ? "#14b8a6" : "#0f766e";
  
  const baseConfig: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    detectRetina: true,
  };

  if (preset === "links") {
    return {
      ...baseConfig,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: tealColor,
        },
        links: {
          color: tealColor,
          distance: 160,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 65,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    };
  }

  // Snow preset
  return {
    ...baseConfig,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    particles: {
      color: {
        value: tealColor,
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: { min: 1, max: 3 },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 2, max: 6 },
      },
      wobble: {
        distance: 10,
        enable: true,
        speed: { min: -15, max: 15 },
      },
    },
  };
};