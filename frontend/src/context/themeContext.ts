import { createContext } from "react";

export type ThemeContextType = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
