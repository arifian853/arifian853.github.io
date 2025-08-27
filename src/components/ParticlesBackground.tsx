import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useParticlePreset } from "./particle-preset-provider";
import { getParticleConfig } from "@/lib/particle-configs";

interface ParticlesBackgroundProps {
  isDark?: boolean;
}

export const ParticlesBackground = ({ isDark = false }: ParticlesBackgroundProps) => {
  const { preset } = useParticlePreset();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Optional callback when particles are loaded
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={getParticleConfig(preset, isDark)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};