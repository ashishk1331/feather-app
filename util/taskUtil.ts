import { format } from "date-fns";
import * as Crypto from "expo-crypto";

import { DayNameType } from "@/types/days";
import { Task } from "@/types/task";

export function generateTask(prompt: string, days: DayNameType[]): Task {
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
        priority: "low",
    };
}

export function sortTodayTasks(tasks: Task[]): Task[] {
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
