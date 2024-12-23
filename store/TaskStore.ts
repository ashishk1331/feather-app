import { create } from "zustand";

import dummyTasks from "@/assets/tasks.json";
import { Task } from "@/types/task";

interface TaskState {
    tasks: Task[];
    finished: Set<number>;
    selected: Set<number>;
    addTask: (task: Task) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
    tasks: dummyTasks as Task[],
    finished: new Set(),
    selected: new Set(),
    addTask(task) {
        return set((prev) => ({ tasks: [task, ...prev.tasks] }));
    },
}));
