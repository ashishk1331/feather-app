import { router } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

import { useTheme } from "@/hooks/useTheme";

export default function Tags() {
    const { primary } = useTheme();

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
                    <Flex
                        flexDirection="row"
                        alignItems="baseline"
                        justifyContent="flex-start"
                        style={styles.header}
                        gap={12}
                    >
                        <FontAwesome name="circle" size={24} color={primary} />
                        <Text variant="title">Analytics</Text>
                    </Flex>
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
    header: {
        marginVertical: 18,
        paddingHorizontal: 6,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
    },
});
