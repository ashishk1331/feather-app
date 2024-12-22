import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

type ContainerProps = {
    style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

export default function Container(props: ContainerProps) {
    return <ScrollView style={styles.container}>{props.children}</ScrollView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
});
