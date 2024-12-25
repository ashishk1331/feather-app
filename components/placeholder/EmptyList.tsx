import { useTheme } from "@/hooks/useTheme";
import { useConfigStore } from "@/store/Config";

import Ionicons from "@expo/vector-icons/Ionicons";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function EmptyList() {
    const { text: color, primary } = useTheme();

    const viewArchived = useConfigStore((state) => state.viewArchived);

    return (
        <Flex
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: 128 }}
        >
            <Flex
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                gap={16}
            >
                <Ionicons
                    name={viewArchived ? "leaf" : "sparkles"}
                    size={24}
                    color={primary + "44"}
                />
                <Text style={{ color: color + "44" }}>
                    {viewArchived ? "Archive is empty" : "Add a new Task"}
                </Text>
            </Flex>
        </Flex>
    );
}
