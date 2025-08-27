import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "./ui/button" // Pastikan impor Button dari Shadcn/UI jika belum ada


export function ThemeToggler() {
    const { theme, setTheme } = useTheme()
    const isDarkMode = theme === "dark"

    return (
        <Button
            variant="ghost" // Untuk tampilan minimalis dan elegan
            size="icon"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    )
}
