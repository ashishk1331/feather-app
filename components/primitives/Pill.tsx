import { StyleSheet } from "react-native";

import Text from "./Text";

type PillProps = {
    text: string;
};

export default function Pill({ text }: PillProps) {
    return <Text style={styles.pill}>{text}</Text>;
}

const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: "#f3f4f6",
    },
});
