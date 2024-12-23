import { DayNameType } from "./days";

export type Task = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    liked: boolean;
    type: "task";
    tags: string[];
    due_date: string;
    days: DayNameType[] | "all";
    priority: "low" | "medium" | "high" | "severe";
};
