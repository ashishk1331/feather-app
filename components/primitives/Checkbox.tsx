import { Pressable, StyleSheet } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useTheme } from "@/hooks/useTheme";

type CheckboxProps = {
    id: string;
    isFinished: boolean;
    toggleFinishStatus(id: string): void;
};

export default function Checkbox({
    id,
    isFinished = false,
    toggleFinishStatus,
}: CheckboxProps) {
    const {
        primary,
        background: backgroundColor,
        icon: iconColor,
    } = useTheme();
    return (
        <Pressable
            style={[
                styles.checkbox,
                {
                    borderColor: isFinished ? primary : iconColor + "44",
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
        width: 32,
        height: 32,
        borderWidth: 2,
        borderRadius: 4,
        marginHorizontal: 6,

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});
