import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Text from "./Text";

type PillProps = {
    text: string;
};

export default function Pill({ text }: PillProps) {
    const { text: color, primary } = useTheme();
    return (
        <Text style={[styles.pill, { backgroundColor: primary + "20" }]}>
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
