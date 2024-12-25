import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "./PersistWrapper";

interface AppState {
    darkMode: boolean;
    viewAll: boolean;
    viewArchived: boolean;
    lastLoggedIn: string;
}

interface AppActions {
    toggleDarkMode(): void;
    toggleViewAll(): void;
    toggleViewArchived(): void;
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

            viewArchived: false,
            toggleViewArchived() {
                return set((prev) => ({ viewArchived: !prev.viewArchived }));
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
