import { Pressable, StyleSheet, View } from "react-native";

import { useTaskStore } from "@/store/TaskStore";

type SelectDotProps = {
    id: number;
    isSelected: boolean;
};

export default function SelectDot({ id, isSelected = false }: SelectDotProps) {
    function toggleSelectedStatus(id: number) {
        useTaskStore.setState((prev) => {
            const updateSelected = new Set(prev.selected);

            if (isSelected) {
                updateSelected.delete(id);
            } else {
                updateSelected.add(id);
            }

            return {
                selected: updateSelected,
            };
        });
    }

    return (
        <Pressable
            style={[isSelected ? styles.lesspadding : styles.morepadding]}
            onPress={() => toggleSelectedStatus(id)}
        >
            <View
                style={[
                    styles.checkbox,
                    isSelected ? styles.selected : styles.deselected,
                ]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    lesspadding: {
        padding: 9,
    },
    morepadding: {
        padding: 12,
    },
    checkbox: {
        marginHorizontal: 6,
    },
    selected: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: "#020617",
    },
    deselected: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: "#d4d4d4",
    },
});
