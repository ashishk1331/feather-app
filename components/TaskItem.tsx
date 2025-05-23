import { MotiView } from "moti";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { captilize } from "@/util/taskUtil";

import { useConfigStore } from "@/store/Config";
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
    const { text: color, ...colors } = useTheme();

    const pillBg =
        colors[("priority" + captilize(task.priority)) as keyof typeof colors] +
        "20";

    const viewAll = useConfigStore((state) => state.viewAll);

    const finishedList = useTaskStore((state) => state.finished);
    const finished = finishedList.includes(task.id);
    const toggleFinished = useTaskStore((state) => state.toggleFinished);

    const selectedList = useTaskStore((state) => state.selected);
    const isSelected = selectedList.has(task.id);

    return (
        <MotiView
            delay={index * 120}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Flex
                style={[
                    styles.box,
                    {
                        borderColor: isSelected
                            ? colors.primary + "88"
                            : colors.icon + "20",
                        backgroundColor: isSelected
                            ? colors.primary + "05"
                            : "transparent",
                    },
                ]}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={12}
            >
                {!viewAll && (
                    <Checkbox
                        id={task.id}
                        isFinished={finished}
                        toggleFinishStatus={toggleFinished}
                    />
                )}
                <Flex
                    style={{ width: viewAll ? "88%" : "60%" }}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={8}
                >
                    <Text
                        style={[
                            {
                                color:
                                    finished && !viewAll ? color + "88" : color,
                                textDecorationLine:
                                    finished && !viewAll
                                        ? "line-through"
                                        : "none",
                            },
                        ]}
                    >
                        {task.title}
                    </Text>
                    <Flex
                        flexDirection="row"
                        alignItems="center"
                        gap={6}
                        style={{ flexWrap: "wrap" }}
                    >
                        {task.archived && (
                            <Pill
                                text="archived"
                                style={{
                                    backgroundColor: colors.priorityHigh + "20",
                                }}
                                variant="caption"
                            />
                        )}
                        {task.isOneTime && (
                            <Pill
                                text="1 time"
                                style={{
                                    backgroundColor:
                                        colors.prioritySevere + "20",
                                }}
                                variant="caption"
                            />
                        )}
                        {/*<Pill text={format(new Date(task.due_date), "d MMM")} />*/}
                        <Pill
                            text={task.priority}
                            style={{ backgroundColor: pillBg }}
                            variant="caption"
                        />
                        {task.tags.map((label) => (
                            <Pill key={label} text={label} variant="caption" />
                        ))}
                        {viewAll &&
                            (task.days === "all" ? (
                                <Pill text="every day" variant="caption" />
                            ) : (
                                task.days.map((day, index) => (
                                    <Pill
                                        key={index}
                                        text={day}
                                        variant="caption"
                                    />
                                ))
                            ))}
                    </Flex>
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
