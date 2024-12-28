import { format } from "date-fns";
import * as Crypto from "expo-crypto";

import { DayNameType } from "@/types/days";
import { type Task } from "@/types/task";

import { HideArchived, applyFilterOn } from "./filterPresets";

export function generateTask(
    prompt: string,
    days: DayNameType[],
    priority: Task["priority"],
): Task {
    const UUID = Crypto.randomUUID();
    const daysOfWork = days.includes("all") ? "all" : days;
    const createdAt = new Date().toJSON();
    return {
        id: UUID,
        createdAt,
        updatedAt: createdAt,
        title: prompt,
        liked: false,
        type: "task",
        tags: [],
        days: daysOfWork,
        due_date: new Date().toJSON(),
        priority,
        archived: false,
    };
}

export function sortTodayTasks(tasks: Task[]): Task[] {
    // only show unarchived task
    tasks = applyFilterOn(tasks, HideArchived);

    const today = format(new Date(), "E").toLowerCase() as DayNameType;
    let validTasks = [];
    for (let task of tasks) {
        if (
            (Array.isArray(task.days) && task.days.includes(today)) ||
            task.days === "all"
        ) {
            validTasks.push(task);
        }
    }
    return validTasks;
}

export function captilize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

type Mutation = (tasks: Task[]) => Task[];

export function taskMutations(tasks: Task[], mutations: Mutation[]) {
    return mutations.reduce(
        (prevTasks, mutation) => mutation(prevTasks),
        tasks,
    );
}
