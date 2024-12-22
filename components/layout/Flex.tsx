import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type FlexProps = {
    flex?: number;
    flexDirection?: ViewStyle["flexDirection"];
    justifyContent?: ViewStyle["justifyContent"];
    alignItems?: ViewStyle["alignItems"];
    alignSelf?: ViewStyle["alignSelf"];
    gap?: number;
    style?: StyleProp<ViewStyle>;
    bg?: string;
    children?: React.ReactNode;
};

const Flex: React.FC<FlexProps> = ({
    flex,
    flexDirection = "column",
    justifyContent,
    alignItems,
    alignSelf,
    gap,
    style,
    bg = "",
    children,
}) => {
    return (
        <View
            style={[
                {
                    backgroundColor: bg,
                    flex,
                    flexDirection,
                    justifyContent,
                    alignItems,
                    alignSelf,
                    gap,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

export default Flex;
