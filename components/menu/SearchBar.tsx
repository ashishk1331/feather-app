import { MotiView } from "moti";
import { StyleSheet, TextInput } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { FadeIn } from "@/constants/Animate";

import { useTheme } from "@/hooks/useTheme";

import { useConfigStore } from "@/store/Config";

import Flex from "../layout/Flex";

export default function SearchBar() {
    const { text: color, icon } = useTheme();
    const [search, setSearch] = useConfigStore(
        useShallow((state) => [state.search, state.setSearch]),
    );
    return (
        <MotiView {...FadeIn}>
            <Flex flexDirection="column" gap={6} style={styles.container}>
                <TextInput
                    cursorColor={color}
                    style={[
                        styles.inputbox,
                        { borderColor: icon + "20", color },
                    ]}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="search task"
                    placeholderTextColor={icon + "88"}
                />
            </Flex>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    headline: {
        marginLeft: 6,
    },
    inputbox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderRadius: 6,
        fontSize: 16,
    },
});
