import { differenceInCalendarDays } from "date-fns";
import { Stack } from "expo-router/stack";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";

// close selected tasks on view change
// and viewArchived option as well
useConfigStore.subscribe(({ viewAll }, { viewAll: prevViewAll }) => {
    if (viewAll !== prevViewAll) {
        useTaskStore.setState({ selected: new Set() });
        useConfigStore.setState({ viewArchived: false, viewFilters: false });
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
