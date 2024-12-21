import React from "react";
import {
    Text as RNText,
    TextProps as RNTextProps,
    StyleProp,
    StyleSheet,
    TextStyle,
} from "react-native";

type TextProps = RNTextProps & {
    children: React.ReactNode;
    variant?: "title" | "subtitle" | "body" | "caption";
    color?: string;
    style?: StyleProp<TextStyle>;
};

const Text: React.FC<TextProps> = ({
    children,
    variant = "body",
    color = "#000",
    style,
    ...props
}) => {
    return (
        <RNText
            style={[
                styles[variant],
                { color }, // Dynamically set text color
                style, // Additional custom styles
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    body: {
        fontSize: 16,
        fontWeight: "normal",
    },
    caption: {
        fontSize: 12,
        fontWeight: "300",
    },
});

export default Text;
