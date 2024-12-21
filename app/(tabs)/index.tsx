import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import List from "@/components/List";
import Container from "@/components/layout/Container";

export default function Page() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Container>
                <Header />
                <List />
            </Container>
        </SafeAreaView>
    );
}
