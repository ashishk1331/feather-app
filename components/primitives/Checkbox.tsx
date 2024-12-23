import { Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useTaskStore } from "@/store/TaskStore";

import AntDesign from "@expo/vector-icons/AntDesign";

type CheckboxProps = {
    id: number;
    isFinished: boolean;
};

export default function Checkbox({ id, isFinished = false }: CheckboxProps) {
    const { primary, background: backgroundColor, text: color } = useTheme();
    function toggleFinishStatus(id: number) {
        useTaskStore.setState((prev) => {
            const updateFinished = new Set(prev.finished);

            if (isFinished) {
                updateFinished.delete(id);
            } else {
                updateFinished.add(id);
            }

            return {
                finished: updateFinished,
            };
        });
    }

    return (
        <Pressable
            style={[
                styles.checkbox,
                {
                    borderColor: color + "44",
                    backgroundColor: isFinished ? primary : backgroundColor,
                },
            ]}
            onPress={() => toggleFinishStatus(id)}
        >
            {isFinished && <AntDesign name="check" size={20} color="#fff" />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        width: 28,
        height: 28,
        borderWidth: 2,
        borderRadius: 4,
        marginHorizontal: 6,

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    // selected: {
    //     backgroundColor: "#865dff",
    // },
    // deselected: {
    //     borderColor: "#a3a3a3",
    // },
});
