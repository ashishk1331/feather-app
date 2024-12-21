import { StyleSheet, TouchableOpacity } from "react-native";

import { useTaskStore } from "@/store/TaskStore";

import AntDesign from "@expo/vector-icons/AntDesign";

type CheckboxProps = {
    id: number;
    isFinished: boolean;
};

export default function Checkbox({ id, isFinished = false }: CheckboxProps) {
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
        <TouchableOpacity
            style={[
                styles.checkbox,
                isFinished ? styles.selected : styles.deselected,
            ]}
            onPress={() => toggleFinishStatus(id)}
        >
            {isFinished && <AntDesign name="check" size={20} color="#fff" />}
        </TouchableOpacity>
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
    selected: {
        backgroundColor: "#865dff",
        borderColor: "#020617",
    },
    deselected: {
        borderColor: "#a3a3a3",
    },
});
