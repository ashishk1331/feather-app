import { MotiView } from "moti";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Flex from "../layout/Flex";

type ProgressProps = {
    widthPercentage: number;
};

// width should be percentage [0, 1]
export default function Progress({ widthPercentage = 0 }: ProgressProps) {
    const { text: color, primary } = useTheme();
    widthPercentage = Math.min(100, widthPercentage);
    return (
        <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            style={[
                styles.pill,
                styles.outerPill,
                { backgroundColor: primary + "20" },
            ]}
        >
            <MotiView
                from={{ width: 0 }}
                animate={{ width: widthPercentage * 64 }}
                transition={{
                    type: "timing",
                    duration: 350,
                }}
                style={[styles.pill, { backgroundColor: primary }]}
            />
        </Flex>
    );
}

const styles = StyleSheet.create({
    pill: {
        height: 16,
        borderRadius: 16,
    },
    outerPill: {
        width: 64,
        overflow: "hidden",
    },
});
