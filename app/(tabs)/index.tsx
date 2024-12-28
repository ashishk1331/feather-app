import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

import Header from "@/components/Header";
import List from "@/components/List";
import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";
import { useFormStore } from "@/store/FormStore";
import { useTaskStore } from "@/store/TaskStore";
import { subsetTasksWithFilters } from "@/util/filterPresets";
import { searchThroughTasks } from "@/util/searchUtil";
import { sortTodayTasks, taskMutations } from "@/util/taskUtil";

export default function Page() {
    const { background: backgroundColor } = useTheme();

    const [viewAll, viewArchived, appliedFilters] = useConfigStore(
        useShallow((state) => [
            state.viewAll,
            state.viewArchived,
            state.appliedFilters,
        ]),
    );

    const search = useFormStore((state) => state.search);

    const tasks = useTaskStore((state) => state.tasks);
    // const deletedTasks = useTaskStore((state) => state.trash);
    const todayTasks = sortTodayTasks(tasks);
    const archivedTasks = tasks.filter((task) => task.archived);
    const normalTasks = tasks.filter((task) => !task.archived);

    const tasksToDisplay = taskMutations(tasks, [
        // view archived or normal tasks
        (t) => (viewArchived ? archivedTasks : normalTasks),

        // find tasks for today
        (t) => (viewAll ? t : todayTasks),

        // apply filters to the tasks
        (t) => subsetTasksWithFilters(t, appliedFilters),

        // search through tasks
        (t) => (search.length > 0 ? searchThroughTasks(t, search) : t),

        // also view deleted tasks
        // (t) => [...t, ...deletedTasks],
    ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor }}>
            <Header tasksToDisplayLength={todayTasks.length} />
            <List tasksToDisplay={tasksToDisplay} />
        </SafeAreaView>
    );
}
