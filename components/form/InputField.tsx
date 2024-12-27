import { StyleSheet, TextInput } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

type InputFieldProps = {
    value: string;
    onChangeText(prompt: string): void;
    label?: string;
    placeholder?: string;
    followup?: string;
};

export default function InputField({
    value,
    onChangeText,
    label,
    placeholder = "",
    followup = "",
}: InputFieldProps) {
    const { text: color } = useTheme();
    return (
        <Flex flex={1} flexDirection="column" gap={10}>
            {label && <Text>{label}</Text>}
            <TextInput
                cursorColor={color}
                style={[styles.inputbox, { borderColor: color + "20", color }]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={color + "88"}
            />
            {followup && (
                <Text style={{ color: color + "88" }} variant="caption">
                    {followup}
                </Text>
            )}
        </Flex>
    );
}

const styles = StyleSheet.create({
    inputbox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 16,
    },
});
