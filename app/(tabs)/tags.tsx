import { router } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

export default function Tags() {
    function goBack() {
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Container>
                <Flex
                    flex={1}
                    flexDirection="column"
                    gap={32}
                    style={styles.outerPadding}
                >
                    <Text variant="title" style={{ marginTop: 12 }}>
                        Manage Tags
                    </Text>
                    <Flex
                        flex={1}
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Button
                            variant="outline"
                            title="Go Back"
                            onPress={goBack}
                            style={styles.button}
                        />
                    </Flex>
                </Flex>
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    outerPadding: {
        paddingHorizontal: 6,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
    },
});
