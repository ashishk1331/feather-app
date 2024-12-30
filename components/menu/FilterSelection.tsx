import { MotiView } from "moti";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { FadeIn } from "@/constants/Animate";
import { DayNames } from "@/constants/Days";
import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";
import { Priority } from "@/types/task";
import { AvailableFilters } from "@/util/filterPresets";
import { captilize } from "@/util/taskUtil";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";
import Pill from "../primitives/Pill";

export default function FilterSelection() {
    const colors = useTheme();
    const priorties: Priority[] = ["low", "medium", "high", "severe"];
    const filters: AvailableFilters[] = [...priorties, ...DayNames];

    const [appliedFilters, toggleFilter, resetAppliedFilters] = useConfigStore(
        useShallow((state) => [
            state.appliedFilters,
            state.toggleFilter,
            state.resetAppliedFilters,
        ]),
    );

    return (
        <MotiView {...FadeIn}>
            <Flex flexDirection="column" gap={6} style={styles.container}>
                <Flex flexDirection="row" gap={6} flexWrap="wrap">
                    <Button
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
                    </Button>
                    {filters.map((label) => (
                        <Button
                            key={label}
                            variant="icon"
                            style={{ paddingVertical: 0, paddingHorizontal: 0 }}
                            onPress={() => toggleFilter(label)}
                        >
                            <Pill
                                text={label === "all" ? "every day" : label}
                                style={{
                                    borderWidth: 1,
                                    borderColor: appliedFilters.includes(label)
                                        ? colors[
                                              ("priority" +
                                                  captilize(
                                                      label,
                                                  )) as keyof typeof colors
                                          ] + "88"
                                        : colors.primary,
                                    backgroundColor: appliedFilters.includes(
                                        label,
                                    )
                                        ? (priorties.includes(label)
                                              ? colors[
                                                    ("priority" +
                                                        captilize(
                                                            label,
                                                        )) as keyof typeof colors
                                                ]
                                              : colors.primary) + "88"
                                        : "transparent",
                                }}
                            />
                        </Button>
                    ))}
                </Flex>
            </Flex>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
});
