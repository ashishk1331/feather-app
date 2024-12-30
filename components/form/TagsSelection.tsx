import { AnimatePresence, MotiView } from "moti";
import { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useShallow } from "zustand/react/shallow";

import AntDesign from "@expo/vector-icons/AntDesign";

import { FadeIn } from "@/constants/Animate";

import { useTheme } from "@/hooks/useTheme";

import { useConfigStore } from "@/store/Config";
import { useFormStore } from "@/store/FormStore";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";
import Pill from "../primitives/Pill";
import Text from "../primitives/Text";

export default function TagsSelection() {
    const { text: color, icon, primary } = useTheme();
    const [search, setSearch] = useState("");

    const defaultTags = useConfigStore((state) => state.tags);
    const [tags, toggleTag] = useFormStore(
        useShallow((state) => [state.tags, state.toggleTag]),
    );

    const regex = new RegExp(search, "i");
    const tagsToDisplay = search
        ? defaultTags.filter((tag) => regex.exec(tag))
        : defaultTags;

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
                toggleTag(newTag);
                setSearch("");
            }
        },
        [search],
    );

    return (
        <Flex gap={12}>
            <Text>tags {tags.length ? `(${tags.length})` : null}</Text>
            <Flex flex={1} alignItems="center" gap={6} flexDirection="row">
                <TextInput
                    cursorColor={color}
                    style={[
                        styles.inputbox,
                        {
                            borderColor: icon + "20",
                            color,
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

            <Flex flexDirection="row" gap={6} flexWrap="wrap">
                {tagsToDisplay.map((label) => {
                    const isSelected = tags.includes(label);
                    return (
                        <Button
                            key={label}
                            variant="ghost"
                            onPress={() => toggleTag(label)}
                        >
                            <Pill
                                key={label}
                                text={label}
                                style={{
                                    borderWidth: 2,
                                    borderColor: isSelected
                                        ? primary + "88"
                                        : icon + "20",
                                    backgroundColor: isSelected
                                        ? primary + "20"
                                        : "transparent",
                                }}
                            />
                        </Button>
                    );
                })}
            </Flex>

            <Text style={{ color: color + "88" }} variant="caption">
                Select suitable tags for your task.
            </Text>
        </Flex>
    );
}
const styles = StyleSheet.create({
    inputbox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderRadius: 6,
        fontSize: 16,
        flex: 1,
    },
});
