import { StyleSheet } from "react-native";

import Octicons from "@expo/vector-icons/Octicons";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function ListFooter() {
    return (
        <Flex style={styles.footer} alignItems="center" gap={12}>
            <Octicons name="north-star" size={24} color="#865dff" />
            <Text color="#9ca3af">That's it for today!</Text>
        </Flex>
    );
}

const styles = StyleSheet.create({
    footer: {
        padding: 12,
        paddingVertical: 24,
        marginVertical: 6,
    },
});
