import { format } from "date-fns";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useTaskStore } from "@/store/TaskStore";
import { Task } from "@/types/task";

import Flex from "./layout/Flex";
import Checkbox from "./primitives/Checkbox";
import Pill from "./primitives/Pill";
import SelectDot from "./primitives/SelectDot";
import Text from "./primitives/Text";

type TaskItemProps = {
    index: number;
    task: Task;
};

export default function TaskItem({ index = 0, task }: TaskItemProps) {
    const { text: color } = useTheme();

    const finishedList = useTaskStore((state) => state.finished);
    const finished = finishedList.has(task.id);

    const selectedList = useTaskStore((state) => state.selected);
    const isSelected = selectedList.has(task.id);

    return (
        <MotiView
            delay={index * 120}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Flex
                style={[
                    styles.box,
                    {
                        borderColor: isSelected ? color : color + "20",
                    },
                ]}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={12}
            >
                <Checkbox id={task.id} isFinished={finished} />
                <Flex
                    style={{ width: "60%" }}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={8}
                >
                    <Text
                        style={[
                            {
                                color: !finished ? color : color + "88",
                                textDecorationLine: finished
                                    ? "line-through"
                                    : "none",
                            },
                        ]}
                    >
                        {task.title}
                    </Text>
                    <Pill text={format(new Date(task.due_date), "d MMM")} />
                </Flex>
                <SelectDot id={task.id} isSelected={isSelected} />
            </Flex>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 12,
        borderWidth: 2,
        borderRadius: 6,
        marginVertical: 6,
    },
});
