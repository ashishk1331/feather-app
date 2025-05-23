import { differenceInCalendarDays } from "date-fns";
import { Stack } from "expo-router/stack";
import { setStatusBarStyle } from "expo-status-bar";
import * as R from "ramda";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { findOneTimeFinishedTaskIds } from "@/util/taskUtil";

import { useAnalyticsStore } from "@/store/AnalyticsStore";
import { useConfigStore } from "@/store/Config";
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
        useConfigStore.setState({ search: "" });
    }
});

useTaskStore.subscribe((cur, prev) => {
    // 1. put finished tasks for analytics
    if (cur.finished.length !== prev.finished.length) {
        // const insideAnalyticsFinished = useAnalyticsStore.getState().finished;
        let today = new Date().toJSON();
        today = today.substring(0, today.indexOf("T"));

        // all newly finished tasks + marked unfinished tasks
        for (const id of R.symmetricDifference(cur.finished, prev.finished)) {
            useAnalyticsStore.getState().toggleTaskFromFinished(id, today);
        }
    }

    // 2. move deleted tasks to trash
    if (cur.tasks.length !== prev.tasks.length) {
        const curIDs = cur.tasks.map((task) => task.id);

        useTaskStore.setState({
            trash: [
                ...prev.tasks.filter((task) => !curIDs.includes(task.id)),
                ...prev.trash,
            ],
        });
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
            useTaskStore.setState((prev) => {
                const oneTimeFinishedTaskIds = findOneTimeFinishedTaskIds(
                    prev.finished,
                    prev.tasks,
                );

                return {
                    finished: [],
                    tasks: prev.tasks.filter(
                        (task) => !oneTimeFinishedTaskIds.includes(task.id),
                    ),
                };
            });
        }

        // cheat to reset lastloggedIn
        // useConfigStore.setState({
        //     lastLoggedIn: new Date(2014, 2, 3).toJSON(),
        // });
    }, [lastLoggedIn]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
