import { type Filter } from "@/types/filter";
import { type Task } from "@/types/task";

export const HideArchived: Filter<"archived"> = {
    targetProp: "archived",
    expect: false,
    comparision: "expect",
};

export const LowPriority: Filter<"priority"> = {
    targetProp: "priority",
    expect: "low",
    comparision: "expect",
};

export const MediumPriority: Filter<"priority"> = {
    targetProp: "priority",
    expect: "medium",
    comparision: "expect",
};

export const HighPriority: Filter<"priority"> = {
    targetProp: "priority",
    expect: "high",
    comparision: "expect",
};

export const SeverePriority: Filter<"priority"> = {
    targetProp: "priority",
    expect: "severe",
    comparision: "expect",
};

export const EveryDay: Filter<"days"> = {
    targetProp: "days",
    includes: "all",
    comparision: "includes",
};

export const OnMondays: Filter<"days"> = {
    targetProp: "days",
    includes: "mon",
    comparision: "includes",
};

export const OnTuesdays: Filter<"days"> = {
    targetProp: "days",
    includes: "tue",
    comparision: "includes",
};

export const OnWednesdays: Filter<"days"> = {
    targetProp: "days",
    includes: "wed",
    comparision: "includes",
};

export const OnThrusdays: Filter<"days"> = {
    targetProp: "days",
    includes: "thr",
    comparision: "includes",
};

export const OnFridays: Filter<"days"> = {
    targetProp: "days",
    includes: "fri",
    comparision: "includes",
};

export const OnSaturdays: Filter<"days"> = {
    targetProp: "days",
    includes: "sat",
    comparision: "includes",
};

export const OnSundays: Filter<"days"> = {
    targetProp: "days",
    includes: "sun",
    comparision: "includes",
};

export const FilterIndex: Record<string, Filter> = {
    low: LowPriority,
    medium: MediumPriority,
    high: HighPriority,
    severe: SeverePriority,
    hideArchived: HideArchived,
    all: EveryDay,
    mon: OnMondays,
    tue: OnTuesdays,
    wed: OnWednesdays,
    thr: OnThrusdays,
    fri: OnFridays,
    sat: OnSaturdays,
    sun: OnSundays,
};

export type AvailableFilters = keyof typeof FilterIndex;

export function applyFilterOn<T extends keyof Task>(
    tasks: Task[],
    filter: Filter<T>,
) {
    return tasks.filter((task) => applyFilterOnTask(task, filter));
}

function applyFilterOnTask(task: Task, filter: Filter) {
    if (filter.comparision === "expect") {
        return task[filter.targetProp] === filter.expect;
    } else if (filter.comparision === "includes") {
        return task[filter.targetProp].includes(filter.includes);
    }
    return false;
}

export function subsetTasksWithFilters(
    tasks: Task[],
    filters: (keyof typeof FilterIndex)[],
) {
    if (filters.length < 1) {
        return tasks;
    }

    const tasksToDisplay = [];

    for (const task of tasks) {
        if (
            filters.some((filter) =>
                applyFilterOnTask(task, FilterIndex[filter]),
            )
        ) {
            tasksToDisplay.push(task);
        }
    }

    return tasksToDisplay;
}
