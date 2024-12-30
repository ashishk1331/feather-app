import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

import Header from "@/components/Header";
import List from "@/components/List";

import { useTheme } from "@/hooks/useTheme";

import { subsetTasksWithFilters } from "@/util/filterPresets";
import { searchThroughTasks } from "@/util/searchUtil";
import { sortTodayTasks, taskMutations } from "@/util/taskUtil";

import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";

export default function Page() {
    const { background: backgroundColor } = useTheme();

    const [search, viewAll, viewArchived, appliedFilters] = useConfigStore(
        useShallow((state) => [
            state.search,
            state.viewAll,
            state.viewArchived,
            state.appliedFilters,
        ]),
    );

    const tasks = useTaskStore((state) => state.tasks);
    const todayTasks = sortTodayTasks(tasks);

    const tasksToDisplay = taskMutations(tasks, [
        // view archived or normal tasks
        (t) =>
            viewArchived
                ? t.filter((task) => task.archived)
                : t.filter((task) => !task.archived),

        // find tasks for today
        (t) => (viewAll ? t : todayTasks),

        // apply filters to the tasks
        (t) => subsetTasksWithFilters(t, appliedFilters),

        // search through tasks
        (t) => (search.length > 0 ? searchThroughTasks(t, search) : t),

        // also view deleted tasks
        // (t) => [...t, ...useTaskStore.getState().trash],
    ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor }}>
            <Header tasksToDisplayLength={todayTasks.length} />
            <List tasksToDisplay={tasksToDisplay} />
        </SafeAreaView>
    );
}
