import { FlatList, StyleSheet } from "react-native";

import { useTaskStore } from "@/store/TaskStore";

import TaskItem from "./TaskItem";
import EmptyList from "./placeholder/EmptyList";
import ListFooter from "./placeholder/ListFooter";

export default function List() {
    const tasks = useTaskStore((state) => state.tasks);

    return tasks.length > 0 ? (
        <FlatList
            style={styles.outer}
            data={tasks}
            renderItem={({ item, index }) => (
                <TaskItem key={item.id} index={index} task={item} />
            )}
            keyExtractor={(item) => item.id + ""}
            ListFooterComponent={tasks.length > 10 ? <ListFooter /> : null}
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
