import { MotiView } from "moti";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useTheme } from "@/hooks/useTheme";

import { useConfigStore } from "@/store/Config";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function InfoBar() {
    const { icon, primary } = useTheme();
    const [viewAll, viewArchived] = useConfigStore(
        useShallow((state) => [state.viewAll, state.viewArchived]),
    );

    if (!viewAll || viewArchived) {
        return null;
    }

    return (
        <MotiView>
            <Flex
                flex={1}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={[styles.box, { borderColor: icon + "20" }]}
            >
                <Flex flexDirection="column" alignItems="center" gap={8}>
                    <Text style={{ color: primary + "88" }}>feather v1.3</Text>
                </Flex>
            </Flex>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 12,
        paddingVertical: 24,
        borderRadius: 6,
        marginVertical: 6,
    },
});
