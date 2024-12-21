import { Tabs } from "expo-router";

import AddButton from "@/components/menu/AddButton";

export default function TabLayout() {
    return (
        <Tabs
            tabBar={() => <AddButton />}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "blue",
            }}
        />
    );
}
