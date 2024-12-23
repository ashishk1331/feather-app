import { create } from "zustand";

interface AppState {
    darkMode: boolean;
    viewAll: boolean;
}

interface AppActions {
    toggleDarkMode(): void;
    toggleViewAll(): void;
}

export const useConfigStore = create<AppState & AppActions>()((set) => ({
    darkMode: false,
    toggleDarkMode() {
        return set((prev) => ({ darkMode: !prev.darkMode }));
    },

    viewAll: false,
    toggleViewAll() {
        return set((prev) => ({ viewAll: !prev.viewAll }));
    },
}));
