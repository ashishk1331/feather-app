import { create } from "zustand";

import { DayNames } from "@/constants/Days";

import { type DayNameType } from "@/types/days";
import { Task } from "@/types/task";

interface FormState {
    prompt: string;
    days: DayNameType[];
    priority: Task["priority"];
    isAOneTimeTask: boolean;
    tags: string[];
    errors: Record<string, string>;
}

interface FormActions {
    setPrompt(newPrompt: string): void;
    toggleDay(dayName: DayNameType): void;
    setPriority(newPriority: Task["priority"]): void;
    toggleOneTimeTask(): void;
    toggleTag(tag: string): void;
    reset(): void;
    toggleError(target: string, message: string | undefined): void;
}

function checkOrAddDay<T extends DayNameType[], V extends DayNameType>(
    days: T,
    dayName: V,
): T {
    if (dayName === "all") {
        if (days.includes("all")) {
            days = [] as unknown as T;
        } else {
            for (const day of DayNames) {
                if (!days.includes(day)) {
                    days.push(day);
                }
            }
        }
    } else {
        if (days.includes(dayName)) {
            const index = days.indexOf(dayName);
            days.splice(index, 1);
        } else {
            days.push(dayName);
        }

        if (days.length < 8 && days.includes("all")) {
            const index = days.indexOf("all");
            days.splice(index, 1);
        }
    }

    return [...days] as T;
}

const initialState: FormState = {
    prompt: "",
    days: [],
    priority: "low",
    isAOneTimeTask: false,
    tags: [],
    errors: {},
};

export const useFormStore = create<FormState & FormActions>()((set) => ({
    ...initialState,

    setPrompt(newPrompt) {
        return set({ prompt: newPrompt });
    },

    toggleDay(dayName) {
        return set((prev) => ({
            days: checkOrAddDay(prev.days, dayName),
        }));
    },

    setPriority(newPriority) {
        return set({ priority: newPriority });
    },

    toggleTag(tag) {
        return set((prev) => ({
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((ptag) => ptag !== tag)
                : [tag, ...prev.tags],
        }));
    },

    reset() {
        return set({ ...initialState, days: [], errors: {} });
    },

    toggleOneTimeTask() {
        return set((prev) => ({ isAOneTimeTask: !prev.isAOneTimeTask }));
    },

    toggleError(target, message) {
        return set((prev) => {
            if (message) {
                prev.errors[target] = message;
            }

            return { errors: { ...prev.errors } };
        });
    },
}));
