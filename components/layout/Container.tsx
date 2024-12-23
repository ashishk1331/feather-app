import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

type ContainerProps = {
    style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export default function Container(props: ContainerProps) {
    const { background: backgroundColor } = useTheme();
    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            {props.children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
});
