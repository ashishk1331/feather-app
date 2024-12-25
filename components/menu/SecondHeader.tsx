import { MotiView } from "moti";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { FadeIn } from "@/constants/Animate";
import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";

import Feather from "@expo/vector-icons/Feather";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";

export default function SecondHeader() {
    const { primary, background } = useTheme();

    const [viewArchived, toggleViewArchived] = useConfigStore(
        useShallow((state) => [state.viewArchived, state.toggleViewArchived]),
    );

    return (
        <Flex
            flexDirection="row"
            gap={12}
            alignItems="center"
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
                style={[styles.button, { backgroundColor: primary + "20" }]}
            >
                <MotiView {...FadeIn}>
                    <Feather name="filter" size={24} color={primary} />
                </MotiView>
            </Button>
            <Button
                variant="icon"
                style={[styles.button, { backgroundColor: primary + "20" }]}
            >
                <MotiView {...FadeIn}>
                    <Feather name="search" size={24} color={primary} />
                </MotiView>
            </Button>
        </Flex>
    );
}

const styles = StyleSheet.create({
    outer: {
        marginTop: 6,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
    },
});
