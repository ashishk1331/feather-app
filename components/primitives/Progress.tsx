import { MotiView } from "moti";
import { StyleSheet } from "react-native";

import Flex from "../layout/Flex";

type ProgressProps = {
    widthPercentage: number;
};

// width should be percentage
export default function Progress({ widthPercentage = 0 }: ProgressProps) {
    widthPercentage = Math.min(100, widthPercentage);
    return (
        <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            style={[styles.pill, styles.outerPill]}
        >
            <MotiView
                from={{ width: 0 }}
                animate={{ width: widthPercentage * 64 }}
                transition={{
                    type: "timing",
                    duration: 350,
                }}
                style={[styles.pill, styles.innerPill]}
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
        backgroundColor: "#f3f4f6",
    },
    innerPill: {
        // width: 8,
        backgroundColor: "#865dff",
    },
});
