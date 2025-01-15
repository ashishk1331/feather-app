import { BarChart, barDataItem } from "react-native-gifted-charts";

import { useTheme } from "@/hooks/useTheme";

export default function WeeklyReport() {
    const { primary, text: color } = useTheme();

    const initalLabelData: barDataItem = {
        labelTextStyle: {
            color,
        },
    };

    const barData: barDataItem[] = [
        { value: 250, label: "M" },
        {
            value: 500,
            label: "T",
            frontColor: primary,
        },
        { value: 745, label: "W", frontColor: primary },
        { value: 320, label: "T" },
        { value: 600, label: "F", frontColor: primary },
        { value: 256, label: "S" },
        { value: 300, label: "S" },
    ].map((e) => ({ ...e, ...initalLabelData }));

    return (
        <BarChart
            barWidth={28}
            noOfSections={1}
            barBorderRadius={4}
            frontColor={primary + "88"}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
        />
    );
}
