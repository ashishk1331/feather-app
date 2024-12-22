import { create } from "zustand";

import { DayNames } from "@/constants/Days";
import { type DayNameType } from "@/types/days";

interface FormState {
    prompt: string;
    days: DayNameType[];
}

interface FormActions {
    setPrompt(newPrompt: string): void;
    toggleDay(dayName: DayNameType): void;
    reset(): void;
}

function checkOrAddDay<T extends DayNameType[], V extends DayNameType>(
    days: T,
    dayName: V,
): T {
    if (dayName === "all") {
        if (days.includes("all")) {
            days = [] as unknown as T;
        } else {
            for (let day of DayNames) {
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

    reset() {
        return set(initialState);
    },
}));
export { DayNameType };
