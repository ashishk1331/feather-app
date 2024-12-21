import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Container(props: PropsWithChildren) {
    return <ScrollView style={styles.container}>{props.children}</ScrollView>;
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
});
