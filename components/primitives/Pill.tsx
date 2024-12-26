import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Text from "./Text";

type PillProps = {
    text: string;
    variant?: React.ComponentProps<typeof Text>["variant"];
    style?: StyleProp<TextStyle>;
};

export default function Pill({ text, variant = "body", style }: PillProps) {
    const { primary } = useTheme();
    return (
        <Text
            variant={variant}
            style={[styles.pill, { backgroundColor: primary + "20" }, style]}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
});
