import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useTheme } from "@/hooks/useTheme";

import { captilize } from "@/util/taskUtil";

import { useFormStore } from "@/store/FormStore";

import { Task } from "@/types/task";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";
import Text from "../primitives/Text";

type Priority = Task["priority"];

const priorities: Priority[] = ["low", "medium", "high", "severe"];

export default function PrioritySelection() {
    const { text: color, ...colors } = useTheme();
    const [priority, setPriority] = useFormStore(
        useShallow((state) => [state.priority, state.setPriority]),
    );

    return (
        <Flex gap={12}>
            <Text>priority</Text>
            <Flex
                flexDirection="row"
                style={[
                    styles.container,
                    {
                        borderColor: color + "44",
                    },
                ]}
            >
                {priorities.map((label, index) => (
                    <Pill
                        key={index}
                        label={label}
                        isSelected={priority === label}
                        primary={
                            colors[
                                ("priority" +
                                    captilize(label)) as keyof typeof colors
                            ]
                        }
                        handleOnPress={() => setPriority(label)}
                    />
                ))}
            </Flex>
            <Text style={{ color: color + "88" }} variant="caption">
                Severity of the task
            </Text>
        </Flex>
    );
}

type PillProps = {
    label: Priority;
    isSelected: boolean;
    primary: string;
    handleOnPress(): void;
};

function Pill({
    label,
    isSelected = false,
    primary,
    handleOnPress,
}: PillProps) {
    const { text: color, background } = useTheme();
    return (
        <Button
            variant="outline"
            style={[
                styles.pill,
                {
                    backgroundColor: isSelected ? primary : "transparent",
                    borderColor: isSelected ? "transparent" : color + "44",
                },
            ]}
            onPress={handleOnPress}
        >
            <Text
                variant="body"
                style={{ color: isSelected ? background : color + "88" }}
            >
                {label}
            </Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 6,
        overflow: "hidden",
    },
    pill: {
        flex: 1,
        padding: 10,
        borderRadius: 0,
        borderWidth: 0,
    },
});
