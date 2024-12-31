import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Button from "@/components/primitives/Button";
import Text from "@/components/primitives/Text";

import { FadeIn } from "@/constants/Animate";

import { useTheme } from "@/hooks/useTheme";

import { useConfigStore } from "@/store/Config";

export default function Tags() {
    const { primary, text, icon } = useTheme();
    const [search, setSearch] = useState("");
    const defaultTags = useConfigStore((state) => state.tags);

    function goBack() {
        router.back();
    }

    function removeTag(label: string) {
        useConfigStore.setState((prev) => ({
            tags: prev.tags.filter((tag) => tag !== label),
        }));
    }

    const ifNotInTagsAddIt = useCallback(
        function () {
            if (search) {
                const newTag = search.toLowerCase();
                const isInTags =
                    defaultTags.filter((tag) => tag === newTag).length === 0;
                if (isInTags) {
                    useConfigStore.setState((prev) => ({
                        tags: [newTag, ...prev.tags],
                    }));
                }
                setSearch("");
            }
        },
        [search],
    );

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
                        <Text variant="title">Manage Tags</Text>
                    </Flex>

                    <Flex
                        flex={1}
                        alignItems="center"
                        gap={6}
                        flexDirection="row"
                    >
                        <TextInput
                            cursorColor={text}
                            style={[
                                styles.inputbox,
                                {
                                    borderColor: icon + "20",
                                    color: text,
                                },
                            ]}
                            value={search}
                            onChangeText={setSearch}
                            placeholder="search tags"
                            placeholderTextColor={icon + "88"}
                        />
                        <AnimatePresence>
                            {search && (
                                <MotiView {...FadeIn}>
                                    <Button
                                        variant="icon"
                                        style={{
                                            flex: search ? 1 : 0,
                                        }}
                                        onPress={ifNotInTagsAddIt}
                                    >
                                        <AntDesign
                                            name="check"
                                            size={20}
                                            color={primary}
                                        />
                                    </Button>
                                </MotiView>
                            )}
                        </AnimatePresence>
                    </Flex>

                    <Flex
                        flex={1}
                        flexDirection="row"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={12}
                    >
                        {defaultTags.map((label) => (
                            <Flex
                                key={label}
                                flexDirection="row"
                                alignItems="center"
                                gap={6}
                                style={[
                                    styles.pill,
                                    {
                                        borderWidth: 2,
                                        borderColor: primary + "88",
                                    },
                                ]}
                            >
                                <Text style={{ color: text }}>
                                    {label.toLowerCase()}
                                </Text>
                                <Button
                                    variant="ghost"
                                    style={{ backgroundColor: "transparent" }}
                                    onPress={() => removeTag(label)}
                                >
                                    <AntDesign
                                        name="close"
                                        size={24}
                                        color={primary}
                                    />
                                </Button>
                            </Flex>
                        ))}
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
    pill: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    inputbox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderRadius: 6,
        fontSize: 16,
        flex: 1,
    },
});
