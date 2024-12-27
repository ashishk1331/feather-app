import { Task } from "./task";

export type Comparision = "expect" | "includes";

export type Filter = {
    targetProp: T extends keyof Task ? T : never;
    expect?: string;
    includes?: string | string[];
    comparision: Comparision;
};
