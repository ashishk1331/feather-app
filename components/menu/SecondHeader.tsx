import { router } from "expo-router";
import { MotiView } from "moti";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

import { FadeIn } from "@/constants/Animate";
import { Routes } from "@/constants/Routes";

import { useTheme } from "@/hooks/useTheme";

import { useConfigStore } from "@/store/Config";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";

export default function SecondHeader() {
    const { primary, background, priorityLow: success } = useTheme();

    const [viewArchived, toggleViewArchived] = useConfigStore(
        useShallow((state) => [state.viewArchived, state.toggleViewArchived]),
    );
    const [viewFilters, toggleViewFilters, appliedFilters] = useConfigStore(
        useShallow((state) => [
            state.viewFilters,
            state.toggleViewFilters,
            state.appliedFilters,
        ]),
    );
    const [viewSearch, toggleViewSearch] = useConfigStore(
        useShallow((state) => [state.viewSearch, state.toggleViewSearch]),
    );

    function jumpToTags() {
        router.push(Routes.TagsPage);
    }

    function jumpToAnalytics() {
        router.push(Routes.Analytics);
    }

    return (
        <Flex
            flexDirection="row"
            gap={12}
            alignItems="center"
            flexWrap="wrap"
            style={styles.outer}
        >
            <Button
                variant="icon"
                style={[
                    styles.button,
                    {
                        backgroundColor: viewArchived
                            ? primary
                            : primary + "20",
                    },
                ]}
                onPress={toggleViewArchived}
            >
                <MotiView {...FadeIn}>
                    <Feather
                        name="archive"
                        size={24}
                        color={viewArchived ? background : primary}
                    />
                </MotiView>
            </Button>
            <Button
                variant="icon"
                style={[
                    styles.button,
                    {
                        backgroundColor: primary + "20",
                    },
                ]}
                onPress={jumpToTags}
            >
                <MotiView {...FadeIn}>
                    <Feather name="tag" size={24} color={primary} />
                </MotiView>
            </Button>
            <Button
                variant="icon"
                style={[styles.button, { backgroundColor: primary + "20" }]}
                onPress={jumpToAnalytics}
            >
                <MotiView {...FadeIn}>
                    <Octicons name="graph" size={24} color={primary} />
                </MotiView>
            </Button>
            <Button
                variant="icon"
                style={[
                    styles.button,
                    {
                        backgroundColor: viewFilters
                            ? primary
                            : (appliedFilters.length > 0 ? success : primary) +
                              "20",
                    },
                ]}
                onPress={toggleViewFilters}
            >
                <MotiView {...FadeIn}>
                    {appliedFilters.length > 0 ? (
                        <MaterialIcons
                            name={
                                appliedFilters.length < 10
                                    ? "filter-" + appliedFilters.length
                                    : "filter-9-plus"
                            }
                            size={24}
                            color={viewFilters ? background : primary}
                        />
                    ) : (
                        <Feather
                            name="filter"
                            size={24}
                            color={viewFilters ? background : primary}
                        />
                    )}
                </MotiView>
            </Button>
            <Button
                variant="icon"
                style={[
                    styles.button,
                    {
                        backgroundColor: viewSearch ? primary : primary + "20",
                    },
                ]}
                onPress={toggleViewSearch}
            >
                <MotiView {...FadeIn}>
                    <Feather
                        name="search"
                        size={24}
                        color={viewSearch ? background : primary}
                    />
                </MotiView>
            </Button>
        </Flex>
    );
}

const styles = StyleSheet.create({
    outer: {
        marginVertical: 6,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
    },
});
