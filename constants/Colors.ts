const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const brand = {
    primary: "#865dff",
    warning: "#ef4444",
    priorityLow: "#10b981",
    priorityMedium: "#eab308",
    priorityHigh: "#f87171",
    prioritySevere: "#e879f9",
};

export const Colors = {
    light: {
        ...brand,
        text: "#11181C",
        background: "#F8FAFC",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        ...brand,
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
};
