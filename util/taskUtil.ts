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
