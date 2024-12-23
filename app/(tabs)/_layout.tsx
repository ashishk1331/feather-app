import { Tabs } from "expo-router";

import SelectionMenu from "@/components/menu/SelectionMenu";

export default function TabLayout() {
    return (
        <Tabs
            tabBar={() => <SelectionMenu />}
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
