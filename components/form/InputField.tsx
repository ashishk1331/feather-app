import { StyleSheet, TextInput } from "react-native";
import { useShallow } from "zustand/react/shallow";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useTheme } from "@/hooks/useTheme";

import { useFormStore } from "@/store/FormStore";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function InputField() {
    const { text: color, warning } = useTheme();
    const [prompt, setPrompt, errors] = useFormStore(
        useShallow((state) => [state.prompt, state.setPrompt, state.errors]),
    );

    return (
        <Flex flex={1} flexDirection="column" gap={10}>
            <Text>prompt</Text>
            {errors.prompt && (
                <Flex flex={1} flexDirection="row" alignItems="center" gap={6}>
                    <AntDesign name="warning" size={18} color={warning} />
                    <Text style={{ color: warning }}>Select your days.</Text>
                </Flex>
            )}
            <TextInput
                cursorColor={color}
                style={[styles.inputbox, { borderColor: color + "20", color }]}
                value={prompt}
                onChangeText={setPrompt}
                placeholder="type here..."
                placeholderTextColor={color + "88"}
            />
            <Text style={{ color: color + "88" }} variant="caption">
                Use @ to highlight words.
            </Text>
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
