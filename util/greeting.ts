import { format } from "date-fns";

import greetings from "@/assets/greetings.json";

function randomGreeting(dayName: string) {
    const N = greetings.length;
    let index = Math.round(Math.random() * N);
    if (index < 0) {
        index = 0;
    } else if (index >= N) {
        index = N - 1;
    }
    return greetings[index].replace("[dayName]", dayName);
}

export function* fetchNextHeadline(): Generator<string> {
    const dayName = format(new Date(), "EEEE");
    while (true) {
        yield "Feather";
        yield dayName;
        yield randomGreeting(dayName);
    }
}
