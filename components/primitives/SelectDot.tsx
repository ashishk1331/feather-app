import { Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useTaskStore } from "@/store/TaskStore";

type SelectDotProps = {
    id: string;
    isSelected: boolean;
};

export default function SelectDot({ id, isSelected = false }: SelectDotProps) {
    const { primary, icon } = useTheme();
    function toggleSelectedStatus(id: string) {
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
            style={styles.outer}
            onPress={() => toggleSelectedStatus(id)}
        >
            <View
                style={[
                    styles.checkbox,
                    {
                        backgroundColor: isSelected ? primary : icon + "44",
                    },
                    isSelected ? styles.selected : styles.deselected,
                ]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    outer: {
        padding: 12,
    },
    checkbox: {
        width: 6,
        height: 6,
        marginHorizontal: 6,
        borderRadius: 6,
    },
    selected: {
        transform: [{ scale: 2.4 }],
    },
    deselected: {},
});
