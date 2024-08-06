// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import themes, { Theme } from '@/utils/themes';

interface ThemeContextType {
    theme: Theme;
    setThemeByName: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<string>('light');

    const setThemeByName = (name: string) => {
        setThemeName(name);
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[themeName], setThemeByName }}>
            {children}
        </ThemeContext.Provider>
    );
};
