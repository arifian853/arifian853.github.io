import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "./ui/switch"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isDarkMode = theme === "dark"

    return (
        <div className="flex items-center space-x-2 text-sm">
            <Sun className="text-sm" />
            <Switch
                checked={isDarkMode}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                id="mode-toggle"
            />
            <Moon className="text-sm" />

        </div>
    )
}
