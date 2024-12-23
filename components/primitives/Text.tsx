import { MotiText } from "moti";
import React from "react";
import {
    Text as RNText,
    TextProps as RNTextProps,
    StyleProp,
    StyleSheet,
    TextStyle,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

type TextProps = RNTextProps & {
    children: React.ReactNode;
    variant?: "title" | "subtitle" | "body" | "caption";
    animate?: "rolling";
    style?: StyleProp<TextStyle>;
};

const Text: React.FC<TextProps> = ({
    children,
    variant = "body",
    style,
    animate = null,
    ...props
}) => {
    const isAnimated = animate !== null;
    const TextType = isAnimated ? MotiText : RNText;
    const { text: color } = useTheme();

    let animationProps = {};
    if (animate === "rolling") {
        animationProps = {
            from: { opacity: 0, translateY: -12 },
            animate: { opacity: 1, translateY: 0 },
            transition: {
                type: "timing",
            },
        };
    }

    return (
        <TextType
            style={[styles[variant], { color }, style]}
            {...props}
            {...animationProps}
        >
            {children}
        </TextType>
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
        fontWeight: "normal",
    },
});

export default Text;
