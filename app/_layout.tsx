import { differenceInCalendarDays } from "date-fns";
import { Stack } from "expo-router/stack";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { useConfigStore } from "@/store/Config";
import { useFormStore } from "@/store/FormStore";
import { useTaskStore } from "@/store/TaskStore";

// close selected tasks on view change
// and viewArchived option as well
useConfigStore.subscribe((cur, prev) => {
    if (cur.viewAll !== prev.viewAll) {
        useTaskStore.setState({ selected: new Set() });
        useConfigStore.setState({
            viewArchived: false,
            viewFilters: false,
        });
    }

    if (cur.viewSearch !== prev.viewSearch) {
        useFormStore.setState({ search: "" });
    }
});

export default function HomeLayout() {
    setStatusBarStyle(useColorScheme() ?? "light");
    const lastLoggedIn = useConfigStore((state) => state.lastLoggedIn);

    // reset finished tasks on day change
    useEffect(() => {
        const now = new Date();

        if (!Boolean(lastLoggedIn)) {
            useConfigStore.setState({ lastLoggedIn: now.toISOString() });
        } else if (Math.abs(differenceInCalendarDays(now, lastLoggedIn)) > 0) {
            useConfigStore.setState({ lastLoggedIn: now.toISOString() });
            useTaskStore.setState({ finished: [] });
        }
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
