"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

export function ThemeToggle() {

  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark =
    resolvedTheme === "dark";

  return (

    <button
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark",
        )
      }

      className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        border
        border-gray-200
        bg-white
        text-gray-700
        shadow-sm
        transition-all
        duration-300
        hover:scale-105
        hover:bg-gray-100
        
        dark:border-white/10
        dark:bg-slate-800
        dark:text-white
        dark:hover:bg-slate-700
        "
        >

      {isDark ? (

        <Sun className="h-5 w-5" />

      ) : (

        <Moon className="h-5 w-5" />

      )}

    </button>
  );
}