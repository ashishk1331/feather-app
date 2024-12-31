import { MotiView } from "moti";
import React from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { FadeIn } from "@/constants/Animate";
import { DayNames } from "@/constants/Days";

import { useTheme } from "@/hooks/useTheme";

import { AvailableFilters } from "@/util/filterPresets";
import { captilize } from "@/util/taskUtil";

import { useConfigStore } from "@/store/Config";

import { Priority } from "@/types/task";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";
import Pill from "../primitives/Pill";
import Text from "../primitives/Text";

export default function FilterSelection() {
    const colors = useTheme();
    const priorties: Priority[] = ["low", "medium", "high", "severe"];

    const filterMap: Record<string, AvailableFilters[]> = {
        priorties,
        "days of week": [...DayNames],
    };

    const [appliedFilters, toggleFilter] = useConfigStore(
        useShallow((state) => [state.appliedFilters, state.toggleFilter]),
    );

    return (
        <MotiView {...FadeIn}>
            <Flex flexDirection="column" gap={6} style={styles.outer}>
                {/*<Button
                    variant="icon"
                    style={{ paddingVertical: 0, paddingHorizontal: 0 }}
                    onPress={resetAppliedFilters}
                >
                    <Pill
                        text="clear all"
                        style={{
                            backgroundColor: colors.warning + "88",
                        }}
                    />
                </Button>*/}
                {Object.entries(filterMap).map(([key, value]) => (
                    <React.Fragment key={key}>
                        <Text style={{ marginLeft: 6, marginTop: 6 }}>
                            {key}
                        </Text>
                        <Flex flexDirection="row" gap={6} flexWrap="wrap">
                            {value.map((label) => (
                                <Button
                                    key={label}
                                    variant="icon"
                                    style={{
                                        paddingVertical: 0,
                                        paddingHorizontal: 0,
                                    }}
                                    onPress={() => toggleFilter(label)}
                                >
                                    <Pill
                                        text={
                                            label === "all"
                                                ? "every day"
                                                : label
                                        }
                                        style={{
                                            borderWidth: 1,
                                            borderColor:
                                                appliedFilters.includes(label)
                                                    ? colors[
                                                          ("priority" +
                                                              captilize(
                                                                  label,
                                                              )) as keyof typeof colors
                                                      ] + "88"
                                                    : colors.primary,
                                            backgroundColor:
                                                appliedFilters.includes(label)
                                                    ? (priorties.includes(label)
                                                          ? colors[
                                                                ("priority" +
                                                                    captilize(
                                                                        label,
                                                                    )) as keyof typeof colors
                                                            ]
                                                          : colors.primary) +
                                                      "88"
                                                    : "transparent",
                                        }}
                                    />
                                </Button>
                            ))}
                        </Flex>
                    </React.Fragment>
                ))}
            </Flex>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    outer: {
        paddingBottom: 12,
    },
});
