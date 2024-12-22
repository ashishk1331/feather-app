import { StyleSheet } from "react-native";

import { useTaskStore } from "@/store/TaskStore";

import TaskItem from "./TaskItem";
import Flex from "./layout/Flex";
import EmptyList from "./placeholder/EmptyList";
import ListFooter from "./placeholder/ListFooter";

export default function List() {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <Flex style={styles.outer} gap={6}>
            {tasks.length === 0 && <EmptyList />}
            {tasks.map((task, index) => (
                <TaskItem key={index} index={index} task={task} />
            ))}
            {tasks.length > 10 && <ListFooter />}
        </Flex>
    );
}

const styles = StyleSheet.create({
    outer: {
        marginVertical: 12,
    },
});
