import { create } from "zustand";

interface AppState {
    darkMode: boolean;
    toggleDarkMode(): void;
}

export const useConfigStore = create<AppState>()((set) => ({
    darkMode: false,
    toggleDarkMode() {
        return set((prev) => ({ darkMode: !prev.darkMode }));
    },
}));
