// import { useEffect } from "react";
// import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { useConfigStore } from "@/store/Config";

export function useTheme() {
    const darkMode = useConfigStore((state) => state.darkMode);
    // const toggleDarkMode = useConfigStore((state) => state.toggleDarkMode);
    // const theme = useColorScheme() ?? "light";

    if (darkMode) {
        return Colors.dark;
    }
    return Colors.light;
}
