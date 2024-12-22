import { router, usePathname } from "expo-router";
import { StyleSheet } from "react-native";

import { Routes } from "@/constants/Routes";

import AntDesign from "@expo/vector-icons/AntDesign";

import Button from "../primitives/Button";

export default function AddButton() {
    const pathname = usePathname();
    const isAtHomePage = pathname === "/";

    function jumpTo() {
        router.push(Routes.AddForm);
    }

    return (
        isAtHomePage && (
            <Button variant="icon" style={styles.float} onPress={jumpTo}>
                <AntDesign name="plus" size={24} color="#fff" />
            </Button>
        )
    );
}

const styles = StyleSheet.create({
    float: {
        width: 64,
        height: 64,
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: 64,
        backgroundColor: "#865dff",
        margin: 12,
    },
});
