import { createContext, useContext, useState, ReactNode } from "react";

export type ParticlePreset = "links" | "snow";

type ParticlePresetContextType = {
  preset: ParticlePreset;
  setPreset: (preset: ParticlePreset) => void;
};

const ParticlePresetContext = createContext<ParticlePresetContextType | undefined>(undefined);

type ParticlePresetProviderProps = {
  children: ReactNode;
};

export function ParticlePresetProvider({ children }: ParticlePresetProviderProps) {
  const [preset, setPreset] = useState<ParticlePreset>("links");

  return (
    <ParticlePresetContext.Provider value={{ preset, setPreset }}>
      {children}
    </ParticlePresetContext.Provider>
  );
}

export function useParticlePreset() {
  const context = useContext(ParticlePresetContext);
  if (context === undefined) {
    throw new Error("useParticlePreset must be used within a ParticlePresetProvider");
  }
  return context;
}