import { router } from "expo-router";
import { SafeAreaView } from "react-native";

import Container from "@/components/layout/Container";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

export default function AddForm() {
    function goBack() {
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Container>
                <Button variant="primary" title="Go Back" onPress={goBack} />
                <Text>Add Form Page</Text>
            </Container>
        </SafeAreaView>
    );
}
