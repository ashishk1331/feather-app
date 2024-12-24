import { FlatList, StyleSheet } from "react-native";

import { Task } from "@/types/task";

import TaskItem from "./TaskItem";
import EmptyList from "./placeholder/EmptyList";
import ListFooter from "./placeholder/ListFooter";

type ListProps = {
    tasksToDisplay: Task[];
};

export default function List({ tasksToDisplay }: ListProps) {
    return tasksToDisplay.length > 0 ? (
        <FlatList
            style={styles.outer}
            data={tasksToDisplay}
            renderItem={({ item, index }) => (
                <TaskItem key={item.id} index={index} task={item} />
            )}
            keyExtractor={(item) => item.id}
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
