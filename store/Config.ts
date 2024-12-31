import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AvailableFilters } from "@/util/filterPresets";

import { customStorage } from "./PersistWrapper";

interface AppState {
    darkMode: boolean;
    viewAll: boolean;
    viewArchived: boolean;
    viewFilters: boolean;
    viewSearch: boolean;
    viewTags: boolean;
    lastLoggedIn: string;
    appliedFilters: AvailableFilters[];
    search: string;
    tags: string[];
}

interface AppActions {
    toggleDarkMode(): void;
    toggleViewAll(): void;
    toggleViewArchived(): void;
    toggleViewFilters(): void;
    toggleViewSearch(): void;
    toggleViewTags(): void;
    resetAppliedFilters(): void;
    setLastLoggedIn(lastLoggedIn: string): void;
    setSearch(search: string): void;
    toggleFilter(filterName: AvailableFilters): void;
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

            search: "",
            setSearch(search) {
                return set({ search });
            },

            viewTags: false,
            toggleViewTags() {
                return set((prev) => ({ viewTags: !prev.viewTags }));
            },

            viewFilters: false,
            toggleViewFilters() {
                return set((prev) => ({
                    viewFilters: !prev.viewFilters,
                    viewSearch: false,
                }));
            },
            resetAppliedFilters() {
                return set({ appliedFilters: [] });
            },

            appliedFilters: [],
            toggleFilter(filterName) {
                return set((prev) => {
                    if (prev.appliedFilters.includes(filterName)) {
                        return {
                            appliedFilters: prev.appliedFilters.filter(
                                (f) => f !== filterName,
                            ),
                        };
                    }

                    return {
                        appliedFilters: [filterName, ...prev.appliedFilters],
                    };
                });
            },

            viewSearch: false,
            toggleViewSearch() {
                return set((prev) => ({
                    viewSearch: !prev.viewSearch,
                    viewFilters: false,
                }));
            },

            tags: ["lovely", "handsome", "fire"],
        }),
        {
            name: "feather-config-store",
            storage: createJSONStorage(() => customStorage),
            partialize: ({ darkMode, lastLoggedIn, tags }) => ({
                darkMode,
                lastLoggedIn,
                tags,
            }),
        },
    ),
);
