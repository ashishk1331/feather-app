import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import List from "@/components/List";
import { useTheme } from "@/hooks/useTheme";

export default function Page() {
    const { background: backgroundColor } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor }}>
            <Header />
            <List />
        </SafeAreaView>
    );
}
