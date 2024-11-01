import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "./ui/switch"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDarkMode = theme === "dark"

    return (
        <div className="flex items-center space-x-2">
            <Sun />
            <Switch
                checked={isDarkMode}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                id="mode-toggle"
            />
            <Moon />

        </div>
    )
}
