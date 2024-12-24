import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import List from "@/components/List";
import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";
import { sortTodayTasks } from "@/util/taskUtil";

export default function Page() {
    const { background: backgroundColor } = useTheme();

    const viewAll = useConfigStore((state) => state.viewAll);

    const tasks = useTaskStore((state) => state.tasks);
    const todayTasks = sortTodayTasks(tasks);

    const tasksToDisplay = viewAll ? tasks : todayTasks;

    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor }}>
            <Header tasksToDisplayLength={todayTasks.length} />
            <List tasksToDisplay={tasksToDisplay} />
        </SafeAreaView>
    );
}
