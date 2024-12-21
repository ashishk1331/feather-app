import Ionicons from "@expo/vector-icons/Ionicons";

import Flex from "../layout/Flex";
import Text from "../primitives/Text";

export default function EmptyList() {
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
                gap={12}
            >
                <Ionicons name="sparkles" size={24} color="#d1d5db" />
                <Text color="#d1d5db">Add a new Task</Text>
            </Flex>
        </Flex>
    );
}
