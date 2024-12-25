import { router, usePathname } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { StyleSheet } from "react-native";

import { RiseUp } from "@/constants/Animate";
import { Routes } from "@/constants/Routes";
import { useTheme } from "@/hooks/useTheme";
import { useTaskStore } from "@/store/TaskStore";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import Flex from "../layout/Flex";
import Button from "../primitives/Button";

export default function SelectionMenu() {
    const { primary, warning } = useTheme();
    const selectedTasks = useTaskStore((state) => state.selected);
    const anySelectedTasks = selectedTasks.size > 0;

    const pathname = usePathname();
    const isAtHomePage = pathname === "/";

    function resetSelectedTasks() {
        useTaskStore.setState({
            selected: new Set(),
        });
    }

    function archiveSelectedTasks() {
        useTaskStore.setState((prev) => {
            return {
                tasks: prev.tasks.map((task) => {
                    if (selectedTasks.has(task.id)) {
                        task.archived = !task.archived;
                    }
                    return task;
                }),
                finished: prev.finished.filter((id) => !selectedTasks.has(id)),
                selected: new Set(),
            };
        });
    }

    function deleteSelectedTasks() {
        useTaskStore.setState((prev) => ({
            tasks: prev.tasks.filter((task) => !selectedTasks.has(task.id)),
            finished: prev.finished.filter((id) => !selectedTasks.has(id)),
            selected: new Set(),
        }));
    }

    function jumpToAddForm() {
        router.push(Routes.AddForm);
    }

    return (
        isAtHomePage && (
            <Flex
                style={styles.float}
                flexDirection="row-reverse"
                alignItems="center"
                gap={6}
            >
                <AnimatePresence>
                    {anySelectedTasks ? (
                        <>
                            <MotiView {...RiseUp}>
                                <Button
                                    variant="icon"
                                    style={[
                                        styles.selectionButton,
                                        { backgroundColor: primary },
                                    ]}
                                    onPress={resetSelectedTasks}
                                >
                                    <AntDesign
                                        name="close"
                                        size={24}
                                        color="#fff"
                                    />
                                </Button>
                            </MotiView>
                            <MotiView {...RiseUp} transition={{ delay: 100 }}>
                                <Button
                                    variant="icon"
                                    style={[
                                        styles.selectionButton,
                                        { backgroundColor: primary },
                                    ]}
                                    onPress={archiveSelectedTasks}
                                >
                                    <Feather
                                        name="archive"
                                        size={24}
                                        color="#fff"
                                    />
                                </Button>
                            </MotiView>
                            <MotiView {...RiseUp} transition={{ delay: 200 }}>
                                <Button
                                    variant="icon"
                                    style={[
                                        styles.selectionButton,
                                        { backgroundColor: warning },
                                    ]}
                                    onPress={deleteSelectedTasks}
                                >
                                    <AntDesign
                                        name="delete"
                                        size={24}
                                        color="#fff"
                                    />
                                </Button>
                            </MotiView>
                        </>
                    ) : (
                        <MotiView {...RiseUp}>
                            <Button
                                variant="icon"
                                style={[
                                    styles.selectionButton,
                                    { backgroundColor: primary },
                                ]}
                                onPress={jumpToAddForm}
                            >
                                <AntDesign name="plus" size={24} color="#fff" />
                            </Button>
                        </MotiView>
                    )}
                </AnimatePresence>
            </Flex>
        )
    );
}

const styles = StyleSheet.create({
    float: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 12,
    },
    selectionButton: {
        width: 64,
        height: 64,
        borderRadius: 64,
    },
});
