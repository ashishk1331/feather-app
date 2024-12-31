import { StyleSheet, TextInput } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useTheme } from "@/hooks/useTheme";

import { useFormStore } from "@/store/FormStore";

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
    const { text: color, warning } = useTheme();
    const errors = useFormStore((state) => state.errors);
    return (
        <Flex flex={1} flexDirection="column" gap={10}>
            {label && <Text>{label}</Text>}
            {errors.prompt && (
                <Flex flex={1} flexDirection="row" alignItems="center" gap={6}>
                    <AntDesign name="warning" size={18} color={warning} />
                    <Text style={{ color: warning }}>Select your days.</Text>
                </Flex>
            )}
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
        borderRadius: 6,
        fontSize: 16,
    },
});
