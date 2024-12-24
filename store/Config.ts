import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "./PersistWrapper";

interface AppState {
    darkMode: boolean;
    viewAll: boolean;
}

interface AppActions {
    toggleDarkMode(): void;
    toggleViewAll(): void;
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
        }),
        {
            name: "feather-config-store",
            storage: createJSONStorage(() => customStorage),
            partialize: ({ darkMode }) => ({ darkMode }),
        },
    ),
);
