"use client"

import { FaPython, FaReact, FaNodeJs } from "react-icons/fa6";
import {
    SiJupyter, SiFlask, SiTensorflow, SiKeras, SiScikitlearn,
    SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiPytorch,
    SiGooglegemini, SiDart, SiFlutter, SiFirebase, SiWordpress,
    SiHtml5, SiCss3, SiJavascript, SiWebpack, SiUnity, SiSharp,
    SiFastapi, SiTypescript
} from "react-icons/si";
import { IconType } from "react-icons";

// Icon mapping
const iconMap: Record<string, IconType> = {
    FaPython,
    FaReact,
    FaNodeJs,
    SiJupyter,
    SiFlask,
    SiTensorflow,
    SiKeras,
    SiScikitlearn,
    SiTailwindcss,
    SiMongodb,
    SiExpress,
    SiRedux,
    SiPytorch,
    SiGooglegemini,
    SiDart,
    SiFlutter,
    SiFirebase,
    SiWordpress,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiWebpack,
    SiUnity,
    SiSharp,
    SiFastapi,
    SiTypescript,
};

interface ProjectIconProps {
    iconName: string;
    className?: string;
}

export function ProjectIcon({ iconName, className = "w-4 h-4" }: ProjectIconProps) {
    const Icon = iconMap[iconName];
    if (!Icon) return null;
    return <Icon className={className} />;
}
