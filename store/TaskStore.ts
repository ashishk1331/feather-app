import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import dummyTasks from "@/assets/tasks.json";
import { Task } from "@/types/task";

import { customStorage } from "./PersistWrapper";

interface TaskState {
    tasks: Task[];
    finished: Task["id"][];
    toggleFinished: (id: Task["id"]) => void;
    selected: Set<string>;
    addTask: (task: Task) => void;
    trash: Task[];
    addTasksToTrash(task: Task): void;
    extendTasksToTrash(tasks: Task[]): void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: dummyTasks as Task[],
            finished: [],
            toggleFinished(id) {
                return set((prev) => ({
                    finished: prev.finished.includes(id)
                        ? prev.finished.filter((i) => i !== id)
                        : [...prev.finished, id],
                }));
            },
            selected: new Set(),
            addTask(task) {
                return set((prev) => ({ tasks: [task, ...prev.tasks] }));
            },

            trash: [],
            addTasksToTrash(task) {
                return set((prev) => ({ trash: [task, ...prev.trash] }));
            },
            extendTasksToTrash(tasks) {
                return set((prev) => ({ trash: [...tasks, ...prev.trash] }));
            },
        }),
        {
            name: "task-storage",
            storage: createJSONStorage(() => customStorage),
            partialize: ({ tasks, finished, trash }) => ({
                tasks,
                finished,
                trash,
            }),
        },
    ),
);
