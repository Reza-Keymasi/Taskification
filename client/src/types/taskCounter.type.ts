import { type ITask } from "./task.interface";

export type TaskCounterType = Pick<ITask, "status"> & { count: number };
