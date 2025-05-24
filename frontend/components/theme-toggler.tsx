"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className={cn(`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring`,
                isDark ? "bg-primary" : "bg-gray-400"
            )}
            aria-label="Toggle theme"
        >
            <span
                className={cn(`
                  inline-block h-5 w-5 transform rounded-full bg-background transition-transform`,
                    isDark ? "translate-x-5" : "translate-x-1"
                )}
            >
                {isDark ? (
                    <MoonIcon className="h-3 w-3 m-1 text-primary" />
                ) : (
                    <SunIcon className="h-3 w-3 m-1 text-primary" />
                )}
            </span>
        </button>

    )
}