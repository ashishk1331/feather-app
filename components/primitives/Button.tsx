import React, { PropsWithChildren } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from "react-native";

import Text from "./Text";

type ButtonProps = {
    title?: string;
    onPress?: () => void;
    variant: "icon" | "ghost" | "primary" | "secondary" | "outline";
    color?: string; // Button color
    textColor?: string; // Text color
    style?: StyleProp<ViewStyle>; // Custom styles for the button
    textStyle?: StyleProp<TextStyle>; // Custom styles for the text
    disabled?: boolean; // Disable the button
};

const Button: React.FC<ButtonProps & PropsWithChildren> = ({
    title,
    onPress,
    variant = "primary",
    color = "#fff",
    textColor = "#000",
    style,
    textStyle,
    disabled = false,
    children,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: disabled ? "#ddd" : color },
                styles[variant],
                style,
            ]}
            disabled={disabled}
        >
            {children}
            {title && (
                <Text
                    style={[
                        styles.text,
                        { color: variant === "primary" ? "#fff" : textColor },
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
    outline: {
        borderWidth: 1,
        borderColor: "#000",
    },
});

export default Button;
