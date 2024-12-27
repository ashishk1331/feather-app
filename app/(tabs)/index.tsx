import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

import Header from "@/components/Header";
import List from "@/components/List";
import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";
import { subsetTasksWithFilters } from "@/util/filterPresets";
import { sortTodayTasks } from "@/util/taskUtil";

export default function Page() {
    const { background: backgroundColor } = useTheme();

    const [viewAll, viewArchived, appliedFilters] = useConfigStore(
        useShallow((state) => [
            state.viewAll,
            state.viewArchived,
            state.appliedFilters,
        ]),
    );

    const tasks = useTaskStore((state) => state.tasks);
    const todayTasks = sortTodayTasks(tasks);
    const archivedTasks = tasks.filter((task) => task.archived);
    const normalTasks = tasks.filter((task) => !task.archived);

    const tasksToDisplay = viewAll
        ? viewArchived
            ? archivedTasks
            : normalTasks
        : todayTasks;

    let tasksAfterFilterApplied = subsetTasksWithFilters(
        tasksToDisplay,
        appliedFilters,
    );

    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor }}>
            <Header tasksToDisplayLength={todayTasks.length} />
            <List tasksToDisplay={tasksAfterFilterApplied} />
        </SafeAreaView>
    );
}
