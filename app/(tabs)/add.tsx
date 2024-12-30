import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import DaySelect from "@/components/form/DaySelect";
import InputField from "@/components/form/InputField";
import OneTimeCheckbox from "@/components/form/OneTimeCheckbox";
import PrioritySelection from "@/components/form/PrioritySelection";
import TagsSelection from "@/components/form/TagsSelection";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

import { generateTask } from "@/util/taskUtil";

import { useFormStore } from "@/store/FormStore";
import { useTaskStore } from "@/store/TaskStore";

export default function AddForm() {
    const prompt = useFormStore((state) => state.prompt);
    const setPrompt = useFormStore((state) => state.setPrompt);
    const resetForm = useFormStore((state) => state.reset);

    const addTask = useTaskStore((state) => state.addTask);

    // resets form if out of focus
    useFocusEffect(
        useCallback(() => {
            return resetForm;
        }, []),
    );

    const handleSubmit = useCallback(function () {
        try {
            const {
                prompt,
                days,
                priority,
                tags,
                isAOneTimeTask: isOneTime,
            } = useFormStore.getState();
            addTask(generateTask(prompt, days, priority, tags, isOneTime));
        } finally {
            resetForm();
            router.push("/");
        }
    }, []);

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
                        Add a task
                    </Text>
                    <InputField
                        value={prompt}
                        onChangeText={setPrompt}
                        label="prompt"
                        placeholder="type here..."
                        followup="Use @ to highlight words."
                    />
                    <DaySelect />
                    <PrioritySelection />
                    <TagsSelection />
                    <OneTimeCheckbox />
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
                        <Button
                            variant="primary"
                            title="Add"
                            style={styles.button}
                            onPress={handleSubmit}
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
        paddingBottom: 48,
    },
    button: {
        width: "48%",
        paddingVertical: 16,
    },
});
