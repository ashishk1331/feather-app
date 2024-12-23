import { format } from "date-fns";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";
import { useTaskStore } from "@/store/TaskStore";
import { fetchNextHeadline } from "@/util/greeting";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import Flex from "./layout/Flex";
import Button from "./primitives/Button";
import Progress from "./primitives/Progress";
import Text from "./primitives/Text";

export default function Header() {
    const { primary: primaryColor, text: textColor } = useTheme();

    const viewAll = useConfigStore((state) => state.viewAll);
    const toggleViewAll = useConfigStore((state) => state.toggleViewAll);
    const toggleDarkMode = useConfigStore((state) => state.toggleDarkMode);

    const finishedList = useTaskStore((state) => state.finished);
    const tasks = useTaskStore((state) => state.tasks);
    const finishedTasksCount = finishedList.size;
    const percentageComplete = finishedTasksCount / tasks.length;

    const today = format(new Date(), "d MMM");

    const nextHeadline = fetchNextHeadline();
    const [headline, setHeadline] = useState(nextHeadline.next().value);

    let prompt = "";
    if (finishedTasksCount === 0) {
        prompt = "Yet to start";
    } else if (finishedTasksCount === tasks.length) {
        prompt = "All Done";
    } else {
        prompt = `${finishedTasksCount} Done`;
    }

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        timer = setInterval(() => {
            setHeadline(nextHeadline.next().value);
        }, 10 * 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            style={styles.outer}
        >
            <Flex flexDirection="column" gap={12}>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ marginVertical: 6 }}
                >
                    <Button variant="icon" onPress={toggleDarkMode}>
                        <FontAwesome
                            name="circle"
                            size={24}
                            color={primaryColor}
                        />
                    </Button>
                    <Text
                        key={headline}
                        style={{ fontSize: 24, fontWeight: "bold" }}
                        animate="rolling"
                    >
                        {headline}
                    </Text>
                </Flex>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    gap={12}
                    style={{ marginHorizontal: 6 }}
                >
                    <Text>{today}</Text>
                    <Progress widthPercentage={percentageComplete} />
                    <Text key={prompt} animate="rolling">
                        {prompt}
                    </Text>
                </Flex>
            </Flex>
            <Button variant="icon" onPress={toggleViewAll}>
                <FontAwesome6
                    name={viewAll ? "folder-open" : "folder-closed"}
                    size={24}
                    color={viewAll ? primaryColor : textColor}
                />
            </Button>
        </Flex>
    );
}

const styles = StyleSheet.create({
    outer: {
        marginVertical: 12,
    },
});
