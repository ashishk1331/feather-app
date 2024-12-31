import { format } from "date-fns";
import * as Crypto from "expo-crypto";

import { DayNameType } from "@/types/days";
import { Section } from "@/types/extra";
import { type Task } from "@/types/task";

import { HideArchived, applyFilterOn } from "./filterPresets";

export function generateSection(label: string): Section {
    return {
        type: "section",
        label,
    };
}

export function generateTask(
    prompt: string,
    days: DayNameType[],
    priority: Task["priority"],
    tags: string[],
    isOneTime: boolean,
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
        tags,
        days: daysOfWork,
        due_date: new Date().toJSON(),
        priority,
        archived: false,
        isOneTime,
    };
}

export function sortTodayTasks(tasks: Task[]): Task[] {
    // only show unarchived task
    tasks = applyFilterOn(tasks, HideArchived);

    const today = format(new Date(), "E").toLowerCase() as DayNameType;
    const validTasks = [];
    for (const task of tasks) {
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

export function findOneTimeFinishedTaskIds(finished: string[], tasks: Task[]) {
    return tasks
        .filter((task) => finished.includes(task.id) && task.isOneTime)
        .map((task) => task.id);
}

export function groupTasksByTags(tasks: Task[]): (Task | Section)[] {
    const groupedTasks: Record<string, Task[]> = {};

    for (const task of tasks) {
        for (const individualTag of task.tags) {
            if (individualTag in groupedTasks) {
                groupedTasks[individualTag].push(task);
            } else {
                groupedTasks[individualTag] = [task];
            }
        }
    }

    const serializeIntoArray: (Task | Section)[] = [];
    for (const [label, subtasks] of Object.entries(groupedTasks)) {
        serializeIntoArray.push(generateSection(label));

        for (const individualTask of subtasks) {
            serializeIntoArray.push(individualTask);
        }
    }

    return serializeIntoArray;
}
