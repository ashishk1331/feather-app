import { StyleSheet, TextInput } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useTheme } from "@/hooks/useTheme";
import { useFormStore } from "@/store/FormStore";

import Flex from "../layout/Flex";

export default function SearchBar() {
    const { text: color, icon } = useTheme();
    const [search, setSearch] = useFormStore(
        useShallow((state) => [state.search, state.setSearch]),
    );
    return (
        <Flex flexDirection="column" gap={6} style={styles.container}>
            <TextInput
                cursorColor={color}
                style={[styles.inputbox, { borderColor: icon + "20", color }]}
                value={search}
                onChangeText={setSearch}
                placeholder="search task"
                placeholderTextColor={icon + "88"}
            />
        </Flex>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
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
