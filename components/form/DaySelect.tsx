import { StyleSheet } from "react-native";

import { DayNames } from "@/constants/Days";
import { useTheme } from "@/hooks/useTheme";
import { DayNameType } from "@/types/days";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";
import Text from "../primitives/Text";

const firstRow = DayNames.slice(0, 4);
const secondRow = DayNames.slice(4);

type DaySelectProps = {
    days: DayNameType[];
    toggleDay(dayName: DayNameType): void;
};

export default function DaySelect({ days, toggleDay }: DaySelectProps) {
    return (
        <Flex gap={12}>
            <Text>days</Text>
            <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={12}
            >
                {firstRow.map((label, index) => (
                    <Pill
                        key={index}
                        label={label}
                        isSelected={days.includes(label)}
                        handlePress={() => toggleDay(label)}
                    />
                ))}
            </Flex>
            <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={12}
            >
                {secondRow.map((label, index) => (
                    <Pill
                        key={index}
                        label={label}
                        isSelected={days.includes(label)}
                        handlePress={() => toggleDay(label)}
                    />
                ))}
            </Flex>
        </Flex>
    );
}

type PillProps = {
    label: string;
    isSelected?: boolean;
    handlePress(): void;
};

function Pill({ label, isSelected = false, handlePress }: PillProps) {
    const { text: color, primary } = useTheme();
    return (
        <Button
            variant="outline"
            style={[
                styles.pill,
                {
                    backgroundColor: isSelected ? primary : "transparent",
                    borderColor: isSelected ? "transparent" : color + "44",
                },
            ]}
            onPress={handlePress}
        >
            <Text
                variant="body"
                style={{ color: isSelected ? "#fff" : color + "88" }}
            >
                {label}
            </Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    pill: {
        flex: 1,
        padding: 10,
    },
});
