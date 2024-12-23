import { useTheme } from "@/hooks/useTheme";

import Ionicons from "@expo/vector-icons/Ionicons";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function EmptyList() {
    const { text: color } = useTheme();

    return (
        <Flex
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                gap={16}
            >
                <Ionicons name="sparkles" size={24} color={color + "44"} />
                <Text style={{ color: color + "44" }}>Add a new Task</Text>
            </Flex>
        </Flex>
    );
}
