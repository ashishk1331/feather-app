import React, { PropsWithChildren } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

import Text from "./Text";

type ButtonProps = {
    title?: string;
    onPress?: () => void;
    variant: "icon" | "ghost" | "primary" | "secondary" | "outline";
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
};

type StyleObj = Record<string, StyleProp<ViewStyle>>;

const Button: React.FC<ButtonProps & PropsWithChildren> = ({
    title,
    onPress,
    variant = "primary",
    style,
    textStyle,
    disabled = false,
    children,
}) => {
    const { background: backgroundColor, text: color } = useTheme();

    const buttonVarirants: StyleObj = {
        outline: {
            borderWidth: 1,
            borderColor: color + "44",
        },
    };
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor },
                styles[variant],
                buttonVarirants[variant],
                style,
            ]}
            disabled={disabled}
        >
            {children}
            {title && (
                <Text
                    style={[
                        styles.text,
                        { color: variant === "primary" ? "#fff" : color },
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: {
        backgroundColor: "#865dff",
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    icon: {
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Button;
