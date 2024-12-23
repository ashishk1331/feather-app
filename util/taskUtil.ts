import { format } from "date-fns";

import { DayNameType } from "@/types/days";
import { Task } from "@/types/task";

export function generateTask(prompt: string, days: DayNameType[]): Task {
    const daysOfWork = days.includes("all") ? "all" : days;
    return {
        id: Math.random() * 10000 + 1,
        title: prompt,
        days: daysOfWork,
        due_date: new Date().toJSON(),
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
