import { DayNameType } from "./days";

export type Task = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    liked: boolean;
    type: "task";
    tags: string[];
    due_date: string;
    days: DayNameType[] | "all";
    priority: string;
};
