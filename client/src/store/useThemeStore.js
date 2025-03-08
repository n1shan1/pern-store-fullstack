import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferred-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme });
  },
}));

export { useThemeStore };
