import { Task } from "@/types/task";

export function searchThroughTasks(tasks: Task[], find: string) {
    const regex = new RegExp(find, "i");
    return tasks.filter((task) => regex.test(task.title));
}
