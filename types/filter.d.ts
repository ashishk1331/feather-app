import { Task } from "./task";

export type Comparision = "expect" | "includes";

export type Filter<T extends keyof Task> = {
    targetProp: keyof Task;
    expect?: Task[T];
    includes?: Task[T] | Task[T][];
    comparision: Comparision;
};
