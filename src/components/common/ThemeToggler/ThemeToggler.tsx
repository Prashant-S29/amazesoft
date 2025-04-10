"use client";

import React from "react";

// hooks
import { useTheme } from "next-themes";
import { useMounted } from "~/hooks/useMounted";

// components
import { Button } from "~/components/ui/button";
import { ThemeIcons } from "~/icons";

export const ThemeToggler: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      // className=" hover:bg-transparent"
    >
      {resolvedTheme === "dark" ? (
        <ThemeIcons.SunIcon />
      ) : (
        <ThemeIcons.MoonIcon />
      )}
    </Button>
  );
};
