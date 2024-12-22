import { DayNameType } from "@/store/FormStore";

export type Task = {
    id: number;
    title: string;
    due_date: string;
    days: DayNameType[] | "all";
    // priority: string;
    // status: boolean;
};
