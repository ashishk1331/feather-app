import { Pressable, StyleSheet, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useTheme } from "@/hooks/useTheme";
import { useFormStore } from "@/store/FormStore";

import AntDesign from "@expo/vector-icons/AntDesign";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function OneTimeCheckbox() {
    const {
        primary,
        icon: iconColor,
        background: backgroundColor,
    } = useTheme();
    const [isAOneTimeTask, toggleOneTimeTask] = useFormStore(
        useShallow((state) => [state.isAOneTimeTask, state.toggleOneTimeTask]),
    );

    return (
        <Pressable onPress={toggleOneTimeTask}>
            <Flex flex={1} flexDirection="row" gap={6} alignItems="center">
                <View
                    style={[
                        styles.checkbox,
                        {
                            borderColor: isAOneTimeTask
                                ? primary
                                : iconColor + "44",
                            backgroundColor: isAOneTimeTask
                                ? primary
                                : backgroundColor,
                        },
                    ]}
                >
                    {isAOneTimeTask && (
                        <AntDesign name="check" size={20} color="#fff" />
                    )}
                </View>
                <Flex
                    flex={1}
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={6}
                >
                    <Text>Is it a one time task?</Text>
                    <Text variant="caption">
                        Or else it would be a recurring task.
                    </Text>
                </Flex>
            </Flex>
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
});
