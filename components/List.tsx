import { FlatList, StyleSheet } from "react-native";

import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";
import { sortTodayTasks } from "@/util/taskUtil";

import TaskItem from "./TaskItem";
import EmptyList from "./placeholder/EmptyList";
import ListFooter from "./placeholder/ListFooter";

export default function List() {
    const viewAll = useConfigStore((state) => state.viewAll);

    const tasks = useTaskStore((state) => state.tasks);
    const todayTasks = sortTodayTasks(tasks);

    const tasksToDisplay = viewAll ? tasks : todayTasks;

    return tasksToDisplay.length > 0 ? (
        <FlatList
            style={styles.outer}
            data={tasksToDisplay}
            renderItem={({ item, index }) => (
                <TaskItem key={item.id} index={index} task={item} />
            )}
            keyExtractor={(item) => item.id + ""}
            ListFooterComponent={
                tasksToDisplay.length > 10 ? <ListFooter /> : null
            }
        />
    ) : (
        <EmptyList />
    );
}

const styles = StyleSheet.create({
    outer: {
        paddingTop: 12,
    },
});
