"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

interface MotionProviderProps {
    children: ReactNode;
}

/**
 * LazyMotion provider for optimized Framer Motion bundle.
 * Uses domAnimation features which reduces bundle size.
 * Note: We don't use strict mode to allow existing 'motion' components.
 */
export function MotionProvider({ children }: MotionProviderProps) {
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    );
}
