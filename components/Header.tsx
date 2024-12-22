import { format } from "date-fns";
import { MotiText } from "moti";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { useTaskStore } from "@/store/TaskStore";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Flex from "./layout/Flex";
import Button from "./primitives/Button";
import Progress from "./primitives/Progress";
import Text from "./primitives/Text";

export default function Header() {
    const finishedList = useTaskStore((state) => state.finished);
    const tasks = useTaskStore((state) => state.tasks);
    const finishedTasksCount = finishedList.size;
    const percentageComplete = finishedTasksCount / tasks.length;

    const today = format(new Date(), "d MMM");
    const dayName = format(new Date(), "EEEE");

    const headlines = ["Feather", dayName, "Good vibes only"];
    const [headlineIndex, setHeadlineIndex] = useState<number>(0);

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
            setHeadlineIndex((prev) => (prev + 1) % headlines.length);
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
                    <Button variant="icon">
                        <FontAwesome name="circle" size={24} color="#865dff" />
                    </Button>
                    <MotiText
                        key={headlines[headlineIndex]}
                        from={{ opacity: 0, translateY: -12 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: "timing",
                        }}
                        style={{ fontSize: 24, fontWeight: "bold" }}
                    >
                        {headlines[headlineIndex]}
                    </MotiText>
                </Flex>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    gap={12}
                    style={{ marginHorizontal: 6 }}
                >
                    <Text>{today}</Text>
                    <Progress widthPercentage={percentageComplete} />
                    <MotiText
                        key={prompt}
                        from={{ opacity: 0, translateY: -12 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: "timing",
                        }}
                    >
                        {prompt}
                    </MotiText>
                </Flex>
            </Flex>
            <Button variant="icon">
                <MaterialIcons name="wallet" size={24} color="#020617" />
            </Button>
        </Flex>
    );
}

const styles = StyleSheet.create({
    outer: {
        marginVertical: 12,
    },
});
