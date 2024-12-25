import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "./PersistWrapper";

interface AppState {
    darkMode: boolean;
    viewAll: boolean;
    lastLoggedIn: string;
}

interface AppActions {
    toggleDarkMode(): void;
    toggleViewAll(): void;
    setLastLoggedIn(lastLoggedIn: string): void;
}

export const useConfigStore = create<AppState & AppActions>()(
    persist(
        (set) => ({
            darkMode: false,
            toggleDarkMode() {
                return set((prev) => ({ darkMode: !prev.darkMode }));
            },

            viewAll: false,
            toggleViewAll() {
                return set((prev) => ({ viewAll: !prev.viewAll }));
            },

            lastLoggedIn: "",
            setLastLoggedIn(lastLoggedIn: string) {
                return set({ lastLoggedIn });
            },
        }),
        {
            name: "feather-config-store",
            storage: createJSONStorage(() => customStorage),
            partialize: ({ darkMode, lastLoggedIn }) => ({
                darkMode,
                lastLoggedIn,
            }),
        },
    ),
);
