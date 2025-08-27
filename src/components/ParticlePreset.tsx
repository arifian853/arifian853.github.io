import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { useParticlePreset } from "./particle-preset-provider";
import { Sparkles } from "lucide-react";

export const ParticlePreset = () => {
    const { preset, setPreset } = useParticlePreset();

    return (
        <div className="flex-shrink-0">
            <Select value={preset} onValueChange={(value) => setPreset(value as "links" | "snow")}>
                <SelectTrigger className="w-8 h-8 md:w-10 md:h-10 p-0 border-none bg-transparent">
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                </SelectTrigger>
                <SelectContent className="min-w-[140px]" align="start">
                    <SelectGroup>
                        <SelectLabel className="text-xs">Particle Effects</SelectLabel>
                        <SelectItem value="links" className="text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                Links
                            </div>
                        </SelectItem>
                        <SelectItem value="snow" className="text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                Falling Snow
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
