import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
    const { theme, setThemeByName } = useTheme();
    const handleThemeChange = (value: string) => {
        setThemeByName(value);
    };

    const themeStyles: React.CSSProperties = {
        backgroundColor: theme.primary,
        color: theme.color,
    };
    return (
        <div className="header-font p-5 rounded-md flex justify-between items-center" style={themeStyles}>
            <span>
                Under construction
            </span>
            <Select onValueChange={handleThemeChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                    <SelectItem value="retro">Retro</SelectItem>
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="beige">Beige</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Navbar
