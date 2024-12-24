import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Text from "./Text";

type PillProps = {
    text: string;
    style?: StyleProp<TextStyle>;
};

export default function Pill({ text, style }: PillProps) {
    const { primary } = useTheme();
    return (
        <Text style={[styles.pill, { backgroundColor: primary + "20" }, style]}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    pill: {
        fontSize: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
});
