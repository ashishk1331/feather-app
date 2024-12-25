import { MotiProps } from "moti";

export const RiseUp: MotiProps = {
    from: {
        opacity: 0,
        translateY: 24,
    },
    animate: {
        opacity: 1,
        translateY: 0,
    },
    exit: {
        opacity: 0,
        translateY: 24,
    },
};
