"use client";

import { NextPage } from "next";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";

interface ThemeSwitcherProps {}

const ThemeSwitcher: NextPage<ThemeSwitcherProps> = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "dark" && (
        <button onClick={() => setTheme("light")}>
          <Sun className="w-6 h-6 text-muted-foreground" />
        </button>
      )}
      {theme === "light" && (
        <button onClick={() => setTheme("dark")}>
          <Moon className="w-6 h-6 text-muted-foreground" />
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
