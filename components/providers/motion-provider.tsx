"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import { ReactNode } from "react";

interface MotionProviderProps {
    children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
    return (
        <MotionConfig reducedMotion="user">
            <LazyMotion features={domMax} strict>
                {children}
            </LazyMotion>
        </MotionConfig>
    );
}
