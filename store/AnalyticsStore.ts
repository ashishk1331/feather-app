import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { customStorage } from "./PersistWrapper";

interface AnalyticsState {
    finished: Record<string, string[]>;
}

interface AnalyticsActions {
    addTaskToFinished(taskId: string, datetime: string): void;
    removeTaskFromFinished(taskId: string, datetime: string): void;
    toggleTaskFromFinished(taskId: string, datetime: string): void;
}

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>()(
    persist(
        (set) => ({
            finished: {},
            addTaskToFinished(taskId, datetime) {
                return set((prev) => {
                    if (!Object.hasOwn(prev.finished, datetime)) {
                        prev.finished[datetime] = [];
                    }

                    if (!prev.finished[datetime].includes(taskId)) {
                        prev.finished[datetime].push(taskId);
                    }

                    return { finished: prev.finished };
                });
            },
            removeTaskFromFinished(taskId, datetime) {
                return set((prev) => {
                    if (!Object.hasOwn(prev.finished, datetime)) {
                        prev.finished[datetime] = [];
                    }

                    if (!prev.finished[datetime].includes(taskId)) {
                        prev.finished[datetime].push(taskId);
                    }

                    return { finished: prev.finished };
                });
            },

            toggleTaskFromFinished(taskId, datetime) {
                return set((prev) => {
                    if (!Object.hasOwn(prev.finished, datetime)) {
                        prev.finished[datetime] = [];
                    }

                    if (prev.finished[datetime].includes(taskId)) {
                        prev.finished[datetime] = prev.finished[
                            datetime
                        ].filter((id) => id !== taskId);
                    } else {
                        prev.finished[datetime].push(taskId);
                    }

                    return { finished: prev.finished };
                });
            },
        }),
        {
            name: "feather-analytics-store",
            storage: createJSONStorage(() => customStorage),
            partialize({ finished }) {
                return { finished };
            },
        },
    ),
);
